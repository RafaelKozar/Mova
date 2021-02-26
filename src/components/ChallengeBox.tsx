import React from "react";
import style from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  const hasActiveChanllenge = true;

  return (
    <div className={style.challenboxContainer}>
      {hasActiveChanllenge ? (
        <div className={style.challengeActve}>
          <header>Ganhe 400 xp</header>
          <main>
            <img src="icons/body.svg" alt="" />
            <strong>Novo desafio</strong>
            <p>Levanta e faça uma caminhada de 3 minutos</p>
          </main>
          <footer>
            <button type="button" className={style.challenboxFailedButton}>
              Falhei
            </button>
            <button type="button" className={style.challenboxSucceededButton}>
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
