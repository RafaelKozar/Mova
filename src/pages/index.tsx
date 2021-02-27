import React, { Children } from "react";
import { GetServerSideProps } from 'next';
import CompletedChallenges from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from "../styles/pages/Home.module.css";

import Head from 'next/head';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChalengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level : number;
  currentExperience : number;
  chalendCompleted:  number;
}

export default function Home( props: HomeProps ) {
  console.log(props);
  return (
    <ChalengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience}
      chalendCompleted={props.chalendCompleted} >
      <div className={styles.container}>
        <Head>
          <title>Início | Mova</title>
        </Head>

        <ExperienceBar />
        <CountdownProvider>
          <section style={{ marginTop: 30 }} >
            <div  >
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChalengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, chalendCompleted } = ctx.req.cookies;

  return {
    props: {
      level : Number(level),
      currentExperience : Number(currentExperience),
      chalendCompleted : Number(chalendCompleted)
    }
  }
}