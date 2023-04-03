import { GetServerSidePropsContext } from 'next'

export default function index() {
  return (
    <div>
      dashboard
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { headers } = context.req
  const cookie = headers.cookie
  try {
    const res = await fetch('http://localhost:3000/api/users/readOne', {
      headers: {
        cookie: `${cookie}`
      }
    })
    const data = await res.json()
    return {props:{data}}
  } catch (error) {
    
  }

}
