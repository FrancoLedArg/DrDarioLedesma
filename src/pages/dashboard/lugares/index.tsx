import Image from 'next/image'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'

// Layout
import Layout from '@/layout/dashboard/Layout'

// Components
import Card from '@/components/dashboard/lugares/Card'
import Form from '@/components/dashboard/lugares/Form'

// Css
import styles from '@styles/dashboard/lugares.module.css'

interface LugaresDeAtencion {
  id: number,
  ciudad: string,
  institucion: string,
  dia?: Date,
  comienzo?: string,
  final?: string,
  precio?: number
}

export default function index ({ data }: { data: LugaresDeAtencion[] }) {
  const [edit, setEdit] = useState(false)

  return (
    <>
      <Layout>
        <div>
          <nav className={styles.menu}>
            <span className={styles.menu_span}>
              LUGARES DE ATENCIÓN
            </span>

            <label className={styles.menu_button_label}>
              <span className={styles.menu_button_span}>
                {edit ? 'CANCELAR EDICION' : 'EDITAR'}
              </span>

              <Image
                src={edit ? '/images/pencil2.svg' : '/images/pencil.svg'}
                alt='Pencil'
                width={20}
                height={20}
                className={styles.menu_button_image}
              />
              <input
                type="button"
                onClick={() => setEdit(!edit)}
                className={styles.menu_button}
              />
            </label>
          </nav>

          {edit ?
            <div className={styles.cards_container}>
              {data.map((e, index) => (
                <Form key={index} data={e} />
              ))}
            </div>
          :
            <div className={styles.cards_container}>
              {data.map((e, index) => (
                <Card key={index} data={e}/>
              ))}
            </div>
          }

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
    const res = await fetch('http://localhost:3000/api/lugares/readMany', {
      headers: {
        cookie: `${cookie}`
      }
    })
    const { data } = await res.json()

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
