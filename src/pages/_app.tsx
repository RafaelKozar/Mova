import { ChalengesProvider, ChallengesContext } from '../contexts/ChallengesContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  
  return (
    <ChalengesProvider>
      <Component {...pageProps} />
    </ChalengesProvider>
  )
}

export default MyApp
