import { motion } from 'framer-motion'

// Css
import styles from '@styles/loaders/loader.module.css'

// Animation
const variants = {
  initial: { opacity: 0, x: -65, y: 15 },
  visible: { opacity: 1, x: -15, y: 15 },
  exit: { opacity: 0, x: 35, y: 15 }
}

export default function loader() {
  return (
    <motion.div
      className={styles.loader}
      variants={variants}
      initial='initial'
      animate='visible'
      exit='exit'
    >
      <div className={styles.dot_spinner}>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
      </div>
    </motion.div>
  )
}
