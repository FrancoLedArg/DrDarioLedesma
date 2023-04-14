import { GetServerSidePropsContext } from 'next'

// Css
import styles from '../../styles/turnos/turnos.module.css'

export default function Turnos({ data }) {
  return (
    <div>
      <span>{JSON.stringify(data)}</span>
      <div>
        <span>Opciones</span>
        <button>Nuevo Turno</button>
        <button>Modificar Turno</button>
        <button>Cancelar Turno</button>
      </div>
    </div>
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
    const response = await fetch('http://localhost:3000/api/users/readOne', {
      headers: {
        cookie: `${cookie}`
      }
    })
    const data = await response.json()

    if(data.data.role === 'ADMIN') {
      return {
        redirect: {
          destination: '/dashboard/turnos',
          permanent: false
        }
      }
    }

    if(!response.ok) {
      throw new Error(data.error)
    }

    return { props: { data } }

  } catch (error) {
    console.error(error)

    return { props: {} }
  }
}
