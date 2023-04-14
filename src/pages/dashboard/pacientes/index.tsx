import { GetServerSidePropsContext } from 'next'

import Layout from '@/layout/dashboard/Layout'

// Css
import styles from '@styles/dashboard/dashboard.module.css'

export default function index({ data }: { data: any }) {
  console.log(data)

  return (
    <>
      <Layout>
        <div>

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
