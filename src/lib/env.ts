/**
 * ZerePy API environment configuration for Baultro
 * 
 * Add these functions to your server/env.ts file
 */

/**
 * Get the API URL for ZerePy
 * @returns The ZerePy API URL or empty string if not configured
 */
export function getZerePyApiUrl(): string {
  return process.env.ZEREPY_API_URL || '';
}

/**
 * Check if ZerePy API is configured
 * @returns true if ZerePy API URL is configured, false otherwise
 */
export function isZerePyConfigured(): boolean {
  const apiUrl = getZerePyApiUrl();
  return !!apiUrl && apiUrl !== 'your_zerepy_api_url_here';
}

/**
 * Get the default AI provider for the application
 * @returns The default AI provider (gemini, zerepy, or together)
 */
export function getDefaultAIProvider(): string {
  return process.env.DEFAULT_AI_PROVIDER || 'gemini';
}

/**
 * Check if the AI provider is ZerePy with Together AI
 * @returns true if the provider is ZerePy with Together AI
 */
export function isTogetherAIProvider(): boolean {
  const provider = getDefaultAIProvider();
  return provider === 'together' || provider === 'zerepy-together';
}

/**
 * Get Together AI model configuration
 * @returns The configured Together AI model or default
 */
export function getTogetherAIModel(): string {
  return process.env.TOGETHER_MODEL || 'meta-llama/Llama-3-70b-chat-hf';
}