import Link from "next/link"

// Css
import styles from '@styles/layout/Header.module.css'

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
  return (
    <>
      <header className={styles.header}>
        <span className={styles.link}>LOGO</span>
        <nav className={styles.nav}>
          {links.map((e, index: number) =>
            <Link
              key={index}
              href={e.url}
              className={styles.link}
            >
              {e.label}
            </Link>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}