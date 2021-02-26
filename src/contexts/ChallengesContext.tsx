import React, { createContext, ReactNode, useState } from "react";
import challenges from '../../challenges.json';

interface Challenge{
    type : 'body' | 'eye';
    description : string;
    amount : number;
}

interface ChallengeContextData {
    level : number;
    currentExperience : Number;
    chalendCompleted : Number;
    activeChallenge :  Challenge;
    levelUp : () => void;
    startNewChanllenge : () => void;
}

interface ChalengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChalengesProvider({ children }: ChalengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [chalendCompleted, CetchalendCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChanllenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
      const chanlenge = challenges[randomChallengeIndex];

      setActiveChallenge(chanlenge);
  }

  return (
    <ChallengesContext.Provider
      value={{ level, currentExperience, chalendCompleted, levelUp, startNewChanllenge, activeChallenge}}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
