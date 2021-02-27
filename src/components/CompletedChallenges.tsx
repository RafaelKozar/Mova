import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export default function CompletedChallenges() {
    const {chalendCompleted} = useContext(ChallengesContext)

    return (
        <div className={styles.CompletedChallengesContainer}>
            <span>Desafios completos</span>            
            <span>{chalendCompleted}</span>
        </div>
    );
}


