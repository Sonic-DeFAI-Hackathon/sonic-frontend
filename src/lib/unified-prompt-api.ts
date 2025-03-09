/**
 * Unified AI game prompt API
 * 
 * This API route handles prompts for all game modes and supports
 * multiple AI providers (Gemini and ZerePy)
 */
import { NextRequest, NextResponse } from 'next/server';
import { AIServiceFactory, AIProviderType } from './ai-service-factory';
import { getDefaultAIProvider } from '@/server/env';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { 
      message, 
      gameType, 
      chatHistory = [], 
      personalityId, 
      provider = getDefaultAIProvider() 
    } = data;
    
    // Validate required fields
    if (!message || !gameType) {
      return NextResponse.json(
        { error: 'Missing required fields: message, gameType' },
        { status: 400 }
      );
    }
    
    // Create the appropriate AI service based on the provider
    // Normalize provider string to lowercase
    const aiProvider = provider.toLowerCase();
    const gameService = AIServiceFactory.createGameService(aiProvider);
    
    // Process the message
    const result = await gameService.sendMessage(
      message,
      gameType,
      chatHistory,
      personalityId
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing game prompt:', error);
    return NextResponse.json(
      { error: 'Failed to process game prompt' },
      { status: 500 }
    );
  }
}