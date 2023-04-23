import { motion } from "framer-motion"

// Css
import styles from '@styles/auth/auth.module.css'

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
        {children}
    </div>
  )
}
