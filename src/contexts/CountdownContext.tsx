import React, { Children, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Countdown } from '../components/Countdown';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
    minutes : number;
    seconds : number;
    hasFinish : boolean
    isActive : boolean
    startCountDonwn : () => void;
    resetCountCountDonw : () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countDownTimeOut: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChanllenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinish, setHasFinish] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountDonwn() {
        setIsActive(true);
    }

    function resetCountCountDonw() {
        clearTimeout(countDownTimeOut);
        setIsActive(false);
        setHasFinish(false)
        setTime(0.05 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0) {
            setHasFinish(true);
            setIsActive(false);
            startNewChanllenge();
        }
    }, [isActive, time]);


    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinish,
            isActive,
            startCountDonwn,
            resetCountCountDonw
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
