import Link from 'next/link'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'

import Layout from '@/layout/dashboard/Layout'

// Css
import styles from '@styles/dashboard/pacientes.module.css'

export default function index({ data }: { data: any }) {
  console.log(data)

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')

  return (
    <>
      <Layout>
        <nav className={styles.menu}>
          <span className={styles.menu_span}>
            PACIENTES
          </span>

          <div>
            <label>
              <span>Nombre</span>
              <input
                type="text"
                onChange={(e) => {
                  setNombre(e.target.value)
                }}
              />
            </label>

            <label>
              <span>Apellido</span>
              <input
                type="text"
                onChange={(e) => {
                  setApellido(e.target.value)
                }}
              />
            </label>
            <Link href={`/dashboard/pacientes?nombre=${nombre}&apellido=${apellido}`}>Buscar</Link>
          </div>

          <div>
            <span>N° de Paciente</span>
            <Link href={'/dashboard/pacientes?pacientes=first'}>Flecha arriba</Link>
            <Link href={'/dashboard/pacientes?pacientes=last'}>Flecha abajo</Link>
          </div>

          <div>
            <span>Ultimo Turno</span>
            <Link href={'/dashboard/pacientes?turnos=first'}>Flecha arriba</Link>
            <Link href={'/dashboard/pacientes?turnos=last'}>Flecha abajo</Link>
          </div>

          <Link href={'/dashboard/pacientes?pacientes=blacklist'}>Lista negra</Link>
        </nav>

        <div className={styles.cards_container}>

        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context
  const { headers } = req
  const cookie = headers.cookie

  const { token } = req.cookies
  if(!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  try {
    const res = await fetch('http://localhost:3000/api/pacientes/readMany', {
      headers: {
        cookie: `${cookie}`
      }
    })
    const data = await res.json()

    if(!res.ok) {
      throw new Error(data.error)
    }

    return { props: { data } }

  } catch (error) {
    alert(error)

    return {
      props: {}
    }
  }
}
