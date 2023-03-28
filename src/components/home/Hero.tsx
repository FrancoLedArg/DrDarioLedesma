import Link from 'next/link'
import Image from 'next/image'

// Css
import styles from '@styles/home/Hero.module.css'

export default function Hero() {
  return (
    <div className={`flex_container ${styles.hero}`}>
      <h1>Dr Dario Ledesma</h1>
      <h3 className={styles.subtitle}>NEURÓLOGO INFANTOJUVENIL</h3>
      <div className={styles.container}>
        <Link href={'#'} className={styles.button} draggable='false'>
          TURNOS
        </Link>
        <Link href={'#'} className={styles.button} draggable='false'>
          PREGUNTAS
        </Link>
      </div>
      <div className={`flex_container ${styles.scroll}`}>
        <h3 className={styles.scrolltitle}>HACIA ABAJO PARA MÁS INFORMACIÓN</h3>
        <div className={styles.wheel}></div>
        <div className={styles.arrows}>
          <Image
            src='/images/arrow.svg'
            alt='arrow'
            width={30}
            height={30}
            className={styles.arrow}
          />
          <Image
            src='/images/arrow.svg'
            alt='arrow'
            width={30}
            height={30}
            className={styles.arrow2}
          />
          <Image
            src='/images/arrow.svg'
            alt='arrow'
            width={30}
            height={30}
            className={styles.arrow3}
          />
        </div>
      </div>
    </div>
  )
}
