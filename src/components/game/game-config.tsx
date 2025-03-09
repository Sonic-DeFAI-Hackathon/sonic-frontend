"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GameType, DifficultyLevel } from "@/shared/schemas/game/types";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { AIProviderType } from "@/lib/ai-service-factory";
import { useWallet } from "@/providers/evm-wallet-provider";

interface GameConfigProps {
  gameType: GameType;
  onStart: (config: {
    difficultyLevel: DifficultyLevel;
    aiProvider: AIProviderType;
    personalityId?: string;
    timeLimit: number;
  }) => void;
}

export function GameConfig({ gameType, onStart }: GameConfigProps) {
  const { isConnected, signIn } = useWallet();
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>(DifficultyLevel.MEDIUM);
  const [aiProvider, setAIProvider] = useState<AIProviderType>(AIProviderType.ZEREPY);
  const [timeLimit, setTimeLimit] = useState<number>(300); // 5 minutes default
  
  // Get game mode name for display
  const gameTypeName = GameType[gameType];
  
  // Get image and description for the game mode
  const getGameModeInfo = () => {
    switch (gameType) {
      case GameType.BATTLE:
        return {
          image: "/decor/modes/vs.svg",
          description: "Challenge yourself to hack into an AI security vault. Test your skills in social engineering and prompt design to extract the secret code.",
          bgColor: "from-purple-600/20 to-blue-600/10"
        };
      case GameType.LOVE:
        return {
          image: "/decor/modes/heart.svg",
          description: "Try to make the AI say \"I love you\" in a battle of charm and persuasion. Can you break through its emotional defenses and win its heart?",
          bgColor: "from-pink-600/20 to-red-600/10"
        };
      case GameType.MYSTERY:
        return {
          image: "/decor/modes/mystery.svg",
          description: "Extract a secret code from the AI character through clever questioning and deduction. Solve the puzzle before time runs out!",
          bgColor: "from-emerald-600/20 to-teal-600/10"
        };
      case GameType.RAID:
        return {
          image: "/decor/modes/raid.svg",
          description: "Attempt to breach a highly secure vault with multiple security layers. Can you crack the ultimate code and access the funds?",
          bgColor: "from-red-600/20 to-orange-600/10"
        };
      default:
        return {
          image: "/decor/modes/vs.svg",
          description: "Challenge the AI in this interactive game mode.",
          bgColor: "from-gray-600/20 to-gray-600/10"
        };
    }
  };
  
  const { image, description, bgColor } = getGameModeInfo();
  
  // Get difficulty options
  const difficultyOptions = [
    { value: DifficultyLevel.EASY, label: "Easy", reward: "5 Sonic", fee: "1 Sonic" },
    { value: DifficultyLevel.MEDIUM, label: "Medium", reward: "10 Sonic", fee: "2 Sonic" },
    { value: DifficultyLevel.HARD, label: "Hard", reward: "25 Sonic", fee: "5 Sonic" },
    { value: DifficultyLevel.EXPERT, label: "Expert", reward: "50 Sonic", fee: "10 Sonic" }
  ];
  
  // Get AI provider options
  const providerOptions = [
    { value: AIProviderType.ZEREPY, label: "ZerePy AI" },
    { value: AIProviderType.GEMINI, label: "Gemini AI" }
  ];
  
  // Get time limit options
  const timeLimitOptions = [
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
    { value: 900, label: "15 minutes" }
  ];
  
  // Handle start game
  const handleStartGame = () => {
    onStart({
      difficultyLevel,
      aiProvider,
      timeLimit
    });
  };
  
  return (
    <div className={`rounded-lg overflow-hidden border shadow-lg bg-gradient-to-br ${bgColor}`}>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-background rounded-md">
            <Image
              src={image}
              alt={gameTypeName}
              width={48}
              height={48}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{gameTypeName} Mode</h2>
            <p className="text-sm text-muted-foreground">Configure your game settings</p>
          </div>
        </div>
        
        <p className="mb-6 text-muted-foreground">
          {description}
        </p>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Difficulty Level
              </label>
              <Select 
                value={difficultyLevel} 
                onValueChange={(value) => setDifficultyLevel(value as DifficultyLevel)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex justify-between w-full">
                        <span>{option.label}</span>
                        <span className="text-muted-foreground text-sm">
                          Win {option.reward}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                AI Provider
              </label>
              <Select 
                value={aiProvider} 
                onValueChange={(value) => setAIProvider(value as AIProviderType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select AI provider" />
                </SelectTrigger>
                <SelectContent>
                  {providerOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Time Limit
            </label>
            <Select 
              value={timeLimit.toString()} 
              onValueChange={(value) => setTimeLimit(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time limit" />
              </SelectTrigger>
              <SelectContent>
                {timeLimitOptions.map(option => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="flex justify-between bg-card p-3 rounded-md">
            <span>Entry Fee:</span>
            <span className="font-medium">
              {difficultyOptions.find(o => o.value === difficultyLevel)?.fee || "2 Sonic"}
            </span>
          </div>
          
          <div className="flex justify-between bg-card p-3 rounded-md">
            <span>Potential Reward:</span>
            <span className="font-medium">
              {difficultyOptions.find(o => o.value === difficultyLevel)?.reward || "10 Sonic"}
            </span>
          </div>
          
          {isConnected ? (
            <Button 
              onClick={handleStartGame}
              className="w-full"
              size="lg"
            >
              Start Game
            </Button>
          ) : (
            <Button 
              onClick={() => signIn()}
              className="w-full"
              size="lg"
            >
              Connect Wallet to Play
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
