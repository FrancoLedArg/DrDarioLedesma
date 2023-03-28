import { motion } from "framer-motion"

// Css
import styles from '@styles/auth/auth.module.css'
import star_styles from '@styles/Stars/Stars.module.css'

// Animations
const variants = {
  initial: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
}

export default function Login({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`flex_container ${styles.auth}`}>
      <div className={star_styles.stars}></div>
      <div className={star_styles.stars2}></div>
      <div className={star_styles.stars3}></div>

      <h1 className={styles.h1}>Dr Dario Ledesma</h1>

      <div className={`flex_container ${styles.glass_container}`}>
        {children}
      </div>
    </div>
  )
}
