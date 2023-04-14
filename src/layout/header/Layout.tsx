import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

// Css
import styles from '@styles/Layout.module.css'

interface Links {
  label: string,
  url: string
}

const links: Array<Links> = [
  {
    label: 'INICIO',
    url: '/'
  },
  {
    label: 'TRAYECTORIA',
    url: '/about'
  },
  {
    label: 'PREGUNTAS',
    url: '/preguntas'
  },
  {
    label: 'TURNOS',
    url: '/turnos'
  }
]

export default function Layout ({
  children,
}: {
  children: React.ReactNode
}) {

  const [display, setDisplay] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <span className={styles.link}>LOGO</span>

          <label className={styles.hamburger}>
            <input type="checkbox" onChange={() => {setDisplay(!display)}}/>
            <svg viewBox="0 0 32 32">
              <path className={`${styles.line} ${styles.line_top_bottom}`} d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className={styles.line} d="M7 16 27 16"></path>
            </svg>
          </label>
        </nav>

        <div className={`${styles.links} ${display ? styles.display : null}`}>
          {links.map((e, index: number) =>
            <Link
              key={index}
              href={e.url}
              className={styles.link}
            >
              {e.label}
            </Link>
          )}
        </div>
      </header>

      <main>{children}</main>
    </>
  )
}
