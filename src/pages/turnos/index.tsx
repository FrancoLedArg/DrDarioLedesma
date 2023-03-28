import { GetServerSidePropsContext } from 'next'

// Css
import styles from '../../styles/turnos/turnos.module.css'

export default function Turnos({ data }) {
  console.log(data)
  return (
    <div>
      <span>Nombre del paciente</span>
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
  const { headers } = context.req
  const cookie = headers.cookie
  try {
    const res = await fetch('http://localhost:3000/api/users/readOne', {
      headers: {
        cookie: cookie
      }
    })
    const data = await res.json()
    return {props:{data}}
  } catch (error) {
    
  }

}

