import styles from './learning-in-open-mind.module.scss';

/* eslint-disable-next-line */
export interface LearningInOpenMindProps {}

export function LearningInOpenMind(props: LearningInOpenMindProps) {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://images.unsplash.com/photo-1611348586755-53860f7ae57a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhcm58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
      />
      <div className={styles['information']}>
        <h1>
          ¿Cual es el beneficio de aprender de manera más eficiente en Open
          Mind?
        </h1>
        <p>
          El sistema de incentivos alineados con objetivos de aprendizaje
          propone recuperar entre el 20% y el 40% del tiempo tradicionalmente
          invertido en aprender una habilidad o tomar un curso. Los padres de
          familia interesados en darle a sus niños más tiempo para jugar
          libremente y en pasar más tiempo en familia, aprovechan Open Mind al
          máximo.
        </p>
        <p>
          En poco tiempo, cuando Open Mind ofrezca cursos completos y pruebas de
          equivalencia, teorizamos que el tiempo recuperado será muy
          significativo, permitiendo a los niños y jóvenes iniciar aprendizajes
          avanzados mucho más pronto.
        </p>
      </div>
    </div>
  );
}

export default LearningInOpenMind;
