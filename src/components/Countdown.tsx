import React, { Fragment, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";



export function Countdown() {
    const {
        minutes,
        hasFinish,
        seconds,
        
        isActive,
        startCountDonwn,
        resetCountCountDonw } = useContext(CountdownContext)

    const [minuteLeft, minutRight] = String(minutes).padStart(2, "0").split("");
    const [secondeft, secondRight] = String(seconds).padStart(2, "0").split("");


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
