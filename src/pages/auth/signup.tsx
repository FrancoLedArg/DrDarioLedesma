import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useFormik } from "formik"
import { motion } from "framer-motion"

// Components
import Loader from '@/components/loaders/loader'

// Layout
import Layout from '@/layout/auth/Layout'

// Libs
import { signupValidate } from "@/libs/formvalidate"

// Css
import styles from '@styles/auth/form.module.css'

// Animations
const variants = {
  initial: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
}

export default function SignupForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<null | string>(null)
  const [error, setError] = useState(null)

  const formik = useFormik({
    initialValues: {
      username: '',
      email:'',
      password: '',
      cpassword: ''
    },
    validate: signupValidate,
    onSubmit
  })

  const inputs = {
    user:
      {
        type: 'text',
        props: 'username',
        image: 'user',
        errors: formik.errors.username
      }
    ,
    paciente: [

    ]
  }

  interface Values {
    username: string,
    password: string,
    cpassword: string
  }

  async function onSubmit(values: Values) {
    const { username, email, password, cpassword } = values
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });
      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        setLoading(false)
        return
      }

      setSuccess('Registrado exitosamente, Inicie sesion!')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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
        <motion.div
          className={`flex_container ${styles.title_container}`}
          variants={variants}
          initial='initial'
          animate='visible'
          exit='exit'
        >
          <motion.span
            className={styles.title}
            variants={variants}
            initial='initial'
            animate='visible'
            exit='exit'
            transition={{ delay: 0.1 }}
          >
            Registrarse
          </motion.span>
        </motion.div>



        <span>Datos del Usuario</span>

        <label className={styles.input_label}>
          <input
            type={inputs.user.type}
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.username ? styles.error : null}
            `}
            {...formik.getFieldProps(inputs.user.props)}
          />
          <span className={styles.input_span}>Usuario</span>
          <Image
            src={`/images/${inputs.user.image}.svg`}
            alt='Persona'
            width={25}
            height={25}
            className={styles.image}
          />
          {inputs.user.errors ? <span className={styles.error_span}>{formik.errors.username}</span> : null}
        </label>

        <label className={styles.input_label}>
          <input
            type='text'
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.username ? styles.error : null}
            `}
            {...formik.getFieldProps('username')}
          />
          <span className={styles.input_span}>Usuario</span>
          <Image
            src={'/images/user.svg'}
            alt='Persona'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.username ? <span className={styles.error_span}>{formik.errors.username}</span> : null}
        </label>

        <label className={styles.input_label}>
          <input
            type='text'
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.username ? styles.error : null}
            `}
            {...formik.getFieldProps('email')}
          />
          <span className={styles.input_span}>Email</span>
          <Image
            src={'/images/arroba.svg'}
            alt='Arroba'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.username ? <span className={styles.error_span}>{formik.errors.username}</span> : null}
        </label>

        <label className={styles.input_label}>
          <input
            type="password"
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.password ? styles.error : null}
            `}
            {...formik.getFieldProps('password')}
          />
          <span className={styles.input_span}>Contraseña</span>
          <Image
            src={'/images/lock.svg'}
            alt='Candado'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.password ? <span className={styles.error_span}>{formik.errors.password}</span> : null}
        </label>

        <label className={styles.input_label}>
          <input
            type="password"
            placeholder=' '
            className={`
              ${styles.input}
              ${formik.errors.cpassword ? styles.error : null}
            `}
            {...formik.getFieldProps('cpassword')}
          />
          <span className={styles.input_span}>Confirmá tu contraseña</span>
          <Image
            src={'/images/lock.svg'}
            alt='Candado'
            width={25}
            height={25}
            className={styles.image}
          />
          {formik.errors.cpassword ? <span className={styles.error_span}>{formik.errors.cpassword}</span> : null}
        </label>

        <button type="submit" className={styles.button}>
          Registrarse
        </button>

        <span>YA TIENES UNA CUENTA?</span>

        <Link href={'/auth/login'} className={styles.button}>
          Inicia Sesion
        </Link>
      </motion.form>
    </Layout>
  )
}
