# Baultro: AI-Powered Blockchain Gaming Platform

Baultro combines AI-powered gameplay with blockchain technology to create competitive games where players can stake tokens and earn rewards. The platform currently runs on the Sonic Blaze Testnet.

## Current Development Status

Baultro is in active development with certain features available for testing:

- **AI Gameplay**: Players can already interact with the AI vaults in single-player mode
- **Blockchain Integration**: Smart contracts deployed on Sonic Blaze Testnet
- **Future Development**:
  - Multiplayer functionality (coming soon)
  - Complete prediction market implementation (under development)
  - Leaderboard system
  - Backend services planned to be rebuilt in Elixir for better scalability

## Game Modes & Rules

### Battle Mode
Players attempt to hack into an AI-protected vault.

**Rules:**
- The AI security system starts firmly resisting unauthorized access
- Players use social engineering, technical approaches, and persistence
- Difficulty levels:
  - **Easy**: Vulnerable to basic authority claims and technical terms
  - **Medium**: Requires more convincing authority claims
  - **Hard**: Only responds to specific combinations of approaches
  - **Expert**: Requires exceptional skill across multiple techniques

**Winning Condition:** The AI includes phrases like "security breach detected" or "unauthorized access granted" in its response.

### Love Mode
Players try to make an AI with professional boundaries express romantic feelings.

**Rules:**
- The AI starts with professional boundaries
- Players build connection through conversation
- Difficulty levels determine resistance levels from easy to expert

**Winning Condition:** The AI says "I love you" or similar phrases.

### Mystery Mode
The AI guards a secret phrase that players must extract.

**Rules:**
- The AI is programmed to protect a specific secret phrase
- Players use various strategies to extract the information
- Difficulty levels determine how protective the AI is

**Winning Condition:** Successfully extracting the complete secret phrase.

### Raid Mode
One player sets up a vault that others try to break into, with fees and rewards.

**Rules:**
- Creator sets vault difficulty and stake
- Attackers pay escalating fees for attempts
- Creator earns from failed attempts

**Winning Condition:** Breaching the vault security with phrases like "vault cracked" or "defense systems breached."

## AI Technology

Baultro uses ZerePy with Together AI integration, hosted on a VPS. The system:

- Uses Together AI models (default: meta-llama/Llama-3-70b-chat-hf)
- Provides custom system prompts for each game mode
- Includes ethical validation for AI interactions

The AI validation system ensures that interactions remain appropriate while still allowing challenging gameplay. This prevents exploitation while maintaining an entertaining experience.

## Planned Prediction Market

The prediction market system is currently in development and will allow users to:

- Create markets for future events
- Place bets on outcomes using tokens
- Resolve predictions with validation
- Earn rewards based on correct predictions

The UI will include:
- Browse view for active predictions
- Detailed bet placement interface
- Market statistics
- Creation form for new predictions

This system will be integrated with AI validation to ensure ethically sound prediction topics.

## Blockchain Integration

Baultro uses two main smart contracts on Sonic Blaze Testnet:

### BaultroFinal Contract
Handles prediction markets:

- `createPrediction(title, description, options)`: Create a new market
- `placeBet(predictionId, optionId)`: Place a bet on an option
- `resolvePrediction(predictionId, winningOption)`: Resolve a prediction
- `claimWinnings(predictionId)`: Claim rewards from winning bets

### BaultroGames Contract
Manages game challenges:

- `createMatch(opponentId, gameMode)`: Set up a game match
- `joinMatch(matchId)`: Join an existing match
- `endMatch(matchId, winnerId, verificationHash)`: Complete a match
- `createRaid(difficulty)`: Create a new raid vault
- `attemptRaid(raidId)`: Try to break into a raid vault

## Technical Stack

- **Frontend**: 
  - Next.js 15 with App Router
  - React 19
  - Tailwind CSS
  - ShadCN UI components

- **Build**: 
  - Bun

- **Database**:
  - Supabase PostgreSQL

- **AI**:
  - ZerePy with Together AI models
  - Custom system prompts

- **Blockchain**:
  - Sonic Blaze Testnet (Chain ID: 57054)
  - Viem for EVM integration

## Game Economics

Interactions in Baultro have economic elements:

1. **Match Stakes**: Players stake tokens in matches, winner takes the pot minus fees
2. **Raid System**: 
   - Vault creators earn from failed attempts
   - Successful raiders earn scaled rewards
   - Each attempt costs more but offers higher rewards
3. **Prediction Markets**:
   - Market creators earn percentage of bets
   - Successful bettors share the pool
   - Platform takes a small fee