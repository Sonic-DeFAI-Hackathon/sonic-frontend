/**
 * ZerePy AI provider for server-side usage
 * 
 * In Next.js App Router, this provider should only be initialized in:
 * 1. Server Components
 * 2. API Routes
 * 3. Server Actions
 * 
 * For client components, use the useAI hook instead.
 */
import { getZerePyApiUrl, isDev } from '@/server/env';

// Safe server-side initialization
let isConfigValid = false;

// Define generation config types
export interface ZerePyGenerationConfig {
  temperature?: number;
  maxOutputTokens?: number;
  stopSequences?: string[];
}

/**
 * ZerePy AI provider class
 */
export class ZerePyProvider {
  private apiUrl: string;
  private generationConfig: ZerePyGenerationConfig;
  private useMockMode: boolean;
  
  /**
   * Creates a new ZerePy provider instance
   * 
   * @param config Custom generation configuration
   * @param forceMock Force mock mode even if API is available
   */
  constructor(config?: ZerePyGenerationConfig, forceMock = false) {
    // Only initialize on the server
    if (typeof window !== 'undefined') {
      this.useMockMode = true;
      this.apiUrl = '';
      if (isDev) {
        console.info('🔍 ZerePy provider imported in browser context - API will be called via server endpoints');
      }
    } else {
      try {
        // Get API URL from server environment
        this.apiUrl = getZerePyApiUrl();
        this.useMockMode = !this.apiUrl || forceMock || this.apiUrl === 'your_zerepy_api_url_here';
        
        if (!this.useMockMode) {
          isConfigValid = true;
          // Only log in development to keep production logs clean
          if (isDev) {
            console.log('✅ ZerePy API initialized successfully on server');
          }
        } else {
          console.warn('⚠️ ZerePy API URL not configured. Mock mode will be used instead.');
        }
      } catch (error) {
        console.error('❌ Failed to initialize ZerePy API:', error);
        this.useMockMode = true;
        this.apiUrl = '';
      }
    }
    
    // Configure model parameters
    this.generationConfig = {
      temperature: config?.temperature ?? 0.7,
      maxOutputTokens: config?.maxOutputTokens ?? 1024,
      stopSequences: config?.stopSequences ?? [],
    };
    
    // Debug logs for development
    if (isDev && typeof window === 'undefined') {
      console.log(this.useMockMode 
        ? '🤖 Using mock ZerePy mode (no API calls will be made)'
        : `🤖 Initialized ZerePy AI with endpoint: ${this.apiUrl}`);
    }
  }
  
  /**
   * Check if the provider is using mock mode
   */
  public isMockMode(): boolean {
    return this.useMockMode;
  }
  
  /**
   * Update generation config
   * 
   * @param config New generation configuration
   */
  public updateConfig(config: Partial<ZerePyGenerationConfig>): void {
    this.generationConfig = {
      ...this.generationConfig,
      ...config,
    };
  }
  
  /**
   * Generate content using ZerePy
   * 
   * @param prompt The prompt to send to ZerePy
   * @returns The generated content
   */
  async generateContent(prompt: string): Promise<string> {
    // If in mock mode, return mock response
    if (this.useMockMode) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `[MOCK RESPONSE] This is a simulated ZerePy response to: "${prompt.substring(0, 50)}..."`;
    }
    
    try {
      const response = await fetch(`${this.apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          temperature: this.generationConfig.temperature,
          max_tokens: this.generationConfig.maxOutputTokens,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error generating content with ZerePy:', error);
      throw new Error('Failed to generate content with ZerePy');
    }
  }
  
  /**
   * Generate content with a chat history
   * 
   * @param messages Array of messages in the chat history
   * @returns The generated response
   */
  async generateChat(messages: Array<{ role: 'user' | 'assistant'; content: string }>): Promise<string> {
    // If in mock mode, return mock response
    if (this.useMockMode) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const lastMessage = messages[messages.length - 1];
      return `[MOCK CHAT] ZerePy response to: "${lastMessage?.content?.substring(0, 50)}..."`;
    }
    
    try {
      const response = await fetch(`${this.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          temperature: this.generationConfig.temperature,
          max_tokens: this.generationConfig.maxOutputTokens,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error generating chat with ZerePy:', error);
      throw new Error('Failed to generate chat response with ZerePy');
    }
  }
}