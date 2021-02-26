import React, { Fragment, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css";

let countDownTimeOut: NodeJS.Timeout;

export function Countdown() {
    const {startNewChanllenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinish, setHasFinish] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minutRight] = String(minutes).padStart(2, "0").split("");
    const [secondeft, secondRight] = String(seconds).padStart(2, "0").split("");

    function startCountDonwn() {
        setIsActive(true);
    }

    function resetCountCountDonw() {
        clearTimeout(countDownTimeOut);
        setIsActive(false);
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
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minutRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinish ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo Encerrado
                </button>
            ) : (
                    <Fragment>
                        {isActive ? (
                            <button
                                type="button"
                                onClick={resetCountCountDonw}
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            >
                                Abandonar Ciclo
                            </button>
                        ) : (
                                <button
                                    type="button"
                                    onClick={startCountDonwn}
                                    className={styles.countdownButton}
                                >
                                    Iniciar Ciclo
                                </button>
                            )}

                    </Fragment>
                )}

        </div>
    );
}
