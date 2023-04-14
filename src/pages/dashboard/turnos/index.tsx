import { GetServerSidePropsContext } from 'next'

import Layout from '@/layout/dashboard/Layout'

// Utils
import getDates from '@/utils/getDates'

// Css
import styles from '@styles/dashboard/turnos.module.css'

export default function index() {
  const dates = getDates()
  console.log(dates)
  return (
    <>
      <Layout>
        turnos
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { headers } = context.req
  const cookie = headers.cookie

  const dates = getDates()

  try {
    const res = await fetch('http://localhost:3000/api/users/readOne', {
      headers: {
        cookie: `${cookie}`
      }
    })
    const data = await res.json()

    if(!res.ok) {
      throw new Error(data.error)
    }

    return {props:{data}}
  } catch (error) {
    console.error(error)
    return {
      props: {}
    }
  }
}
