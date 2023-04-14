import Link from "next/link"

// Css
import styles from '@styles/dashboard/Layout.module.css'

interface Links {
  label: string,
  url: string
}

const links: Array<Links> = [
  {
    label: 'TURNOS',
    url: '/dashboard/turnos'
  },
  {
    label: 'LUGARES DE ATENCIÓN',
    url: '/dashboard/lugares'
  },
  {
    label: 'PACIENTES',
    url: '/dashboard/pacientes'
  }
]

export default function Layout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.dashboard}>
      <span className={styles.title}>PANEL DE CONTROL</span>

      <nav className={styles.dashboard_nav}>
        {links.map((e, index) => (
          <Link key={index} href={e.url} className={styles.link}>
            {e.label}
          </Link>
        ))}
      </nav>

      <main className={styles.main}>{children}</main>
    </div>
  )
}
