import Link from 'next/link'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'

import Layout from '@/layout/dashboard/Layout'

// Css
import styles from '@styles/dashboard/pacientes.module.css'

export default function index({ data }: { data: any }) {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: ''
    },
    // validate: loginValidate,
    onSubmit
  })

  async function onSubmit () {

  }

  return (
    <>
      <Layout>
        <nav className={styles.menu}>
          <span className={styles.menu_span}>
            PACIENTES
          </span>

          <form onSubmit={formik.handleSubmit}>
            <label>
              <span>Nombre</span>
              <input
                type="text"
                {...formik.getFieldProps('nombre')}
              />
            </label>

            <label>
              <span>Apellido</span>
              <input
                type="text"
                {...formik.getFieldProps('apellido ru')}
              />
            </label>
            <button type='submit'>Buscar</button>
          </form>
        </nav>

        <div className={styles.cards_container}>

        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, query } = context
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

  const { nombre, apellido } = query

  if(nombre || apellido) {
    const url = new URL('http://localhost:3000/api/pacientes/readByName')

    if(nombre) {
      url.searchParams.set('nombre', String(nombre))
    }

    if(apellido){
      url.searchParams.set('apellido', String(apellido))
    }

    try {
      const res = await fetch(url, {
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
