import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const {level} = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img
                src="https://scontent.fbfh9-1.fna.fbcdn.net/v/t1.0-9/128798853_3468177013299506_4535050806682738417_n.jpg?_nc_cat=110&ccb=3&_nc_sid=09cbfe&_nc_eui2=AeEFKyBEOhV_p-lu7ZKayB1E9vmGT4ISPVX2-YZPghI9VY0S2tV9wvTQtNpCVkd_Z8IU8sP5oyL4BVR_nbeFwxWK&_nc_ohc=gV92JI-1pvEAX9WrfBO&_nc_ht=scontent.fbfh9-1.fna&oh=d26f8ee0ab08c72f2e5c5ab7445b3f5a&oe=605CBACB"
                alt="Rafa" />
            <div>
                <strong>Rafael Kozar</strong>
                <p>
                    <img src="icons/level.svg" alt="alt" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}
