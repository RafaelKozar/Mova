import React, { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  chalendCompleted: Number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChanllenge: () => void;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  conmpleteChallenge: () => void;
}

interface ChalengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChalengesProvider({ children }: ChalengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(10);
  const [chalendCompleted, setchalendCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChanllenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const chanlenge = challenges[randomChallengeIndex];

    setActiveChallenge(chanlenge);

    new Audio('notification.mp3').play();

    if(Notification.permission == 'granted')
      new Notification("Novo desafio ", {
        body : `Valendo ${chanlenge.amount}xp!`
      })
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function conmpleteChallenge() {
    if (!activeChallenge) { return; }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {      
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setchalendCompleted(chalendCompleted+1);

  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        chalendCompleted,
        levelUp,
        startNewChanllenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        conmpleteChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
