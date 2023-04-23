import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { motion } from "framer-motion"

// Layout
import Layout from '@/layout/auth/Layout'

// Libs
import { newPaciente } from "@/libs/formik/auth/formvalidate"

// Css
import styles from '@styles/auth/form.module.css'

// Animations
const variants = {
  initial: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
}

export default function SignupForm() {
  const router = useRouter()

  interface Paciente {
    nombre: string,
    apellido: string,
    telefono: string
  }

  const formik = useFormik<Paciente>({
    initialValues: {
      nombre: '',
      apellido:'',
      telefono: ''
    },
    validate: newPaciente,
    onSubmit
  })

  async function onSubmit(values: Paciente) {
    console.log(values)
    /*
    const { username, email, password, cpassword } = values
    try {
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      router.push('/auth/new')
    } catch (error) {
      alert(error)
    }
    */
  }

  return (
    <Layout>
      <motion.form
        onSubmit={formik.handleSubmit}
        className={`flex_container ${styles.form}`}
        variants={variants}
        initial='initial'
        animate='visible'
        exit='exit'
      >
        <span className={styles.title}>Datos del Paciente</span>

        <label className={styles.input_label}>
          <input
            type='text'
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.nombre ? styles.error : null}
            `}
            {...formik.getFieldProps('nombre')}
          />
          <span className={styles.input_span}>Nombre</span>
          <Image
            src={'/images/user.svg'}
            alt='Persona'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.nombre ? <span className={styles.error_span}>{formik.errors.nombre}</span> : null}
        </label>

        <label className={styles.input_label}>
          <input
            type='text'
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.apellido ? styles.error : null}
            `}
            {...formik.getFieldProps('apellido')}
          />
          <span className={styles.input_span}>Apellido</span>
          <Image
            src={'/images/arroba.svg'}
            alt='Arroba'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.apellido ? <span className={styles.error_span}>{formik.errors.apellido}</span> : null}
        </label>

        <label className={styles.input_label}>
          <input
            type="text"
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.telefono ? styles.error : null}
            `}
            {...formik.getFieldProps('telefono')}
          />
          <span className={styles.input_span}>Telefono</span>
          <Image
            src={'/images/lock.svg'}
            alt='Candado'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.telefono ? <span className={styles.error_span}>{formik.errors.telefono}</span> : null}
        </label>

        <button type="submit" className={styles.button}>
          Confirmar
        </button>
      </motion.form>
    </Layout>
  )
}
