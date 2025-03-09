/**
 * AI Service Factory
 * 
 * Provides a factory for creating different AI service instances
 */
import { GeminiGameService } from '@/lib/ai/gemini-game-service';
import { ZerePyGameService } from './zerepy-game-service';

export enum AIProviderType {
  GEMINI = 'gemini',
  ZEREPY = 'zerepy'
}

export class AIServiceFactory {
  /**
   * Create an AI game service instance based on provider type
   * 
   * @param providerType The type of AI provider to use
   * @returns An instance of the appropriate game service
   */
  static createGameService(providerType: AIProviderType | string): GeminiGameService | ZerePyGameService {
    const normalizedType = typeof providerType === 'string' 
      ? providerType.toLowerCase() 
      : providerType;
    
    if (normalizedType === AIProviderType.ZEREPY || normalizedType === 'zerepy') {
      return new ZerePyGameService();
    }
    
    // Default to Gemini
    return new GeminiGameService();
  }
}