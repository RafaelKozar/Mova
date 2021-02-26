import React, { createContext, ReactNode, useState } from "react";
import challenges from '../../challenges.json';

interface Challenge{
    type : 'body' | 'eye';
    description : string;
    amount : number;
}

interface ChallengeContextData {
    level : number;
    currentExperience : number;
    chalendCompleted : Number;
    activeChallenge :  Challenge;
    levelUp : () => void;
    startNewChanllenge : () => void;
    resetChallenge : () => void;
    experienceToNextLevel : number;
}

interface ChalengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChalengesProvider({ children }: ChalengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(10);
  const [chalendCompleted, CetchalendCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level+1)*4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChanllenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
      const chanlenge = challenges[randomChallengeIndex];

      setActiveChallenge(chanlenge);
  }

  function resetChallenge() {
      setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{ level, currentExperience, chalendCompleted, levelUp, startNewChanllenge, activeChallenge, resetChallenge, experienceToNextLevel}}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
