import Image from "next/image"

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
      <h1>Profesional de Prestigio</h1>
      <h3 className={styles.subtitle}>
        DEVOTO AL BIENESTAR DE SUS PACIENTES
      </h3>
      <div className={styles.cards_container}>
        <div className={`flex_container ${styles.card}`} onMouseMove={handleOnMouseMove}>
          <Image
            src='/images/school.svg'
            alt={'imagen'}
            height={70}
            width={70}
          />
          <h2 className={styles.card_title}>
            Titulado en la Universidad Nacional de Tucumán
          </h2>
        </div>

        <div className={`flex_container ${styles.card}`} onMouseMove={handleOnMouseMove}>
          <Image
            src='/images/cabinet.svg'
            alt={'imagen'}
            height={70}
            width={70}
          />
          <h2>8 años como neurólogo en el Hospital Garrahan</h2>
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
          <h2>30 años como especialista en neurología y neurofisiología</h2>
        </div>

        <div className={`flex_container ${styles.card}`} onMouseMove={handleOnMouseMove}>
          <Image
            src='/images/jiujitsu.svg'
            alt={'imagen'}
            height={70}
            width={70}
          />
          <h2>
            Fundador de la academia de Jiu-Jitsu
            Pequeño Samurái y del área de juegos 2-4
          </h2>
          <h3>DONDE ASISTEN NIÑOS CON AUTISMO Y DISCAPACIDAD</h3>
        </div>
      </div>
    </div>
  )
}
