/**
 * ZerePy API environment configuration for Baultro
 * 
 * Configuration for connecting to the ZerePy backend
 */

/**
 * Get the API URL for ZerePy
 * @returns The ZerePy API URL or default localhost:8000
 */
export function getZerePyApiUrl(): string {
  // Use environment variable if defined, otherwise use default localhost URL
  return process.env.NEXT_PUBLIC_ZEREPY_API_URL || 'http://localhost:8000';
}

/**
 * Check if ZerePy API is configured
 * @returns true if ZerePy API URL is configured, false otherwise
 */
export function isZerePyConfigured(): boolean {
  const apiUrl = getZerePyApiUrl();
  return !!apiUrl;
}

/**
 * Get the default AI provider for the application
 * @returns The default AI provider (always zerepy for this implementation)
 */
export function getDefaultAIProvider(): string {
  return 'zerepy';
}

/**
 * Check if the AI provider is ZerePy with Together AI
 * @returns true if the provider is ZerePy with Together AI
 */
export function isTogetherAIProvider(): boolean {
  return true; // We're using ZerePy with Together AI
}

/**
 * Get Together AI model configuration
 * @returns The configured Together AI model or default
 */
export function getTogetherAIModel(): string {
  return process.env.NEXT_PUBLIC_TOGETHER_MODEL || 'meta-llama/Llama-3-70b-chat-hf';
}