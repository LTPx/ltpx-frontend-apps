import { useTranslation } from 'react-i18next';

export const useBlog = () => {
  const { t } = useTranslation();

  const linksOpenMind = [
    {
      text: '¿Qué es OpenMind, que es el protocolo LTP y porque debo usarlos?',
      url: 'what-is-openmind',
    },
    { text: '¿Cómo funciona OpenMind?',
      url: 'how-openmind-works'
    },
    {
      text: '¿Cual es el beneficio de aprender de manera más eficiente en Openmind?',
      url: 'learning-in-openmind',
    },
    {
      text: '¿Cómo funciona el sistema de cobro por logros de OpenMind?',
      url: 'achievement-payment-system',
    },
    {
      text: '¿Qué es y Cómo generar la Potenciación de Larga Duración (Long-Term Potentiation)?',
      url: 'long-term-potentiation',
    },
  ];

  const linksTeacher = [
    {
      text: 'Manual de ética para dar clases en la plataforma OpenMind',
      url: 'ethics-manual-for-teaching',
    },
    {
      text: 'Pautas para el perfil de docente',
      url: 'guidelines-teacher-profile',
    },
    {
      text: 'Pautas para la imagen de perfil del docente',
      url: 'teacher-profile-guidelines',
    },
    {
      text: 'Restricción y remoción de maestros',
      url: 'removal-of-teachers',
    },
    {
      text: 'Política de redes sociales para maestros',
      url: 'social-media-policy',
    },
    {
      text: ' ¿Como evaluar a mis alumnos para recibir pagos en OpenMind?',
      url: 'evaluate-to-receive-payments',
    },
    {
      text: 'Seguridad y privacidad del alumno',
      url: 'student-safety-privacy',
    },
    {
      text: 'Como crear una gran clase en OpenMind',
      url: 'how-create-a-class',
    },
    {
      text: '¿Como asegurarse de entregar una gran experiencia en vivo en OpenMind?',
      url: 'great-experience-openMind',
    },
    {
      text: 'Clases 1 a 1: Generando impacto y oportunidades',
      url: 'generating-impact-opportunities',
    },
    {
      text: '¿Qué hace que una gran clase continua?',
      url: 'what-makes-class-going-on',
    }
  ];

  const linksStudent = [
    {
      text: 'Guía de privacidad del alumno',
      url: 'student-privacy-guide',
    },
  ];

  return {
    linksOpenMind,
    linksStudent,
    linksTeacher
  };
};
