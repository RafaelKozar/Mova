import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import style from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  const {activeChallenge, resetChallenge} = useContext(ChallengesContext)

  return (
    <div className={style.challenboxContainer}>
      {activeChallenge ? (
        <div className={style.challengeActve}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button type="button" onClick={resetChallenge}  className={style.challenboxFailedButton}>
              Falhei
            </button>
            <button type="button"  className={style.challenboxSucceededButton}>
              Completei
            </button>
          </footer>          
        </div>
      ) : (
        <div className={style.challenboxNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}
