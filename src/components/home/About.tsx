import Image from "next/image"
import { motion, scrollYProgress } from 'framer-motion'

// Css
import styles from '@styles/home/About.module.css'

export default function About() {
  const handleOnMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget: target } = e
    const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top

    target.style.setProperty("--mouse-x", `${x}px`)
    target.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <div className={`flex_container ${styles.about}`}>
      <div className={styles.title_container}>
        <span className={styles.title}>
          Profesional de Prestigio
        </span>

        <span className={styles.subtitle}>
          TRAYECTORIA, RESPONSABILIDAD, EXCELENCIA.
          <br />
          SIEMPRE AL CUIDADO DE SUS PACIENTES
        </span>
      </div>

      <div className={styles.cards_container}>
        <div
          className={`flex_container ${styles.card}`}
          onMouseMove={handleOnMouseMove}
        >
          <Image
            src='/images/school.svg'
            alt={'imagen'}
            height={70}
            width={70}
          />

          <span className={styles.card_title}>
            Titulado en la Universidad Nacional de Tucumán
          </span>
        </div>

        <div className={`flex_container ${styles.card}`} onMouseMove={handleOnMouseMove}>
          <Image
            src='/images/cabinet.svg'
            alt={'imagen'}
            height={70}
            width={70}
          />

          <span className={styles.card_title}>
            8 años como neurólogo en el Hospital Garrahan
          </span>

          <div>
            <h3>JEFE DE RESIDENTES</h3>
            <h3>BECARIO DE NEUROFISIOLOGÍA</h3>
            <h3>(ELECTROENCEFALOGRAFÍA, POLISOMNOGRAFÍA)</h3>
          </div>
        </div>

        <div className={`flex_container ${styles.card}`} onMouseMove={handleOnMouseMove}>
          <Image
            src='/images/brain.svg'
            alt={'imagen'}
            height={70}
            width={70}
          />

          <span className={styles.card_title}>
            30 años como especialista en neurología y neurofisiología
          </span>
        </div>

        <div className={`flex_container ${styles.card}`} onMouseMove={handleOnMouseMove}>
          <Image
            src='/images/jiujitsu.svg'
            alt={'imagen'}
            height={70}
            width={70}
          />
          <span className={styles.card_title}>
            Fundador de la academia de Jiu-Jitsu
            Pequeño Samurái y del área de juegos 2-4
          </span>

          <span>
            DONDE ASISTEN NIÑOS CON AUTISMO Y DISCAPACIDAD
          </span>
        </div>
      </div>
    </div>
  )
}
