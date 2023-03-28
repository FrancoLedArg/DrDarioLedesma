// Css
import styles from '@styles/home/FAQ.module.css'
import star_styles from '@styles/Stars/Stars.module.css'

const questions = [
  {
    question: '¿Cuándo y a qué hora atiende?',
    answer: `
    Solamente por la mañana.
    De lunes a viernes en Santiago del Estero (capital).
    Por turnos en el interior, consultar en el apartado de turnos.
    `
  },
  {
    question: '¿Atiende en algún hospital o servicio público?',
    answer: 'No.'
  },
  {
    question: '¿Atiende con obra social?',
    answer: 'Solamente UOCRA, ninguna otra, pero si entrego facturas, puede presentarlas en su obra social para solicitar el reintegro.'
  },
  {
    question: '¿Qué estudios realiza?',
    answer: `
      Electroencefalograma de vigilia y sueño,
      y test de atención computarizada.
    `
  },
  {
    question: '¿Los estudios se pagan aparte?',
    answer: 'Si.'
  },
  {
    question: '¿Realiza electroencefalogramas para admisión a, por ejemplo, la policía provincial?',
    answer: `
    Sí, para admisión a la policía provincial y federal, el ejército, y el profesorado de educación física.
    `
  }
]

export default function FAQ() {
  const handleOnMouseMoveHover = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget: target } = e
    const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top

    target.style.setProperty("--mouse-x", `${x}px`)
    target.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <div className={`flex_container ${styles.faq}`}>
      <h1>Preguntas Frecuentes</h1>
      <div className={styles.container}>
        <div className={star_styles.stars}></div>
        <div className={star_styles.stars2}></div>
        <div className={star_styles.stars3}></div>

        <div className={styles.slider}>
          {questions.map((e, index) => (
            <div
              key={index}
              className={styles.card}
              onMouseMove={handleOnMouseMoveHover}
            >
              <h2>{e.question}</h2>
              <p className={styles.answer}>
                {e.answer}
              </p>
            </div>
          ))}
          {questions.map((e, index) => (
            <div
              key={index}
              className={styles.card}
              onMouseMove={handleOnMouseMoveHover}
            >
              <h2>{e.question}</h2>
              <p className={styles.answer}>
                {e.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
