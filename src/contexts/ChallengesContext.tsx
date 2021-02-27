import React, { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';

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
  level : number;
  currentExperience : number;
  chalendCompleted:  number;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChalengesProvider({ 
  children,
  ...rest }: ChalengesProviderProps) {

  // const [initLevel, setinitLevel] = useState(0);

  // useEffect(() => {
  //   var ll = Number(Cookies.get('level'));
  //   setinitLevel(ll);
  // }, [])

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [chalendCompleted, setchalendCompleted] = useState(rest.chalendCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {

    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('chalendCompleted', String(chalendCompleted));

  }, [level, currentExperience, chalendCompleted]);

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
