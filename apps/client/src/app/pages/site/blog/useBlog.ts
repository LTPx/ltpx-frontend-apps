import { useTranslation } from 'react-i18next';

export const useBlog = () => {
  const { t } = useTranslation();

  const linksOpenMind = [
    {
      text: '¿Qué es Openmind, que es el protocolo LTP y porque debo usarlos?',
      url: '/blog/what-is-openmind',
    },
    { text: '¿Cómo funciona Openmind?',
      url: '/blog/how-openmind-works'
    },
    {
      text: '¿Cual es el beneficio de aprender de manera más eficiente en Openmind?',
      url: '/blog/learning-in-openmind',
    },
    {
      text: '¿Cómo funciona el sistema de cobro por logros de Openmind?',
      url: '/blog/achievement-payment-system',
    },
    {
      text: '¿Qué es y Cómo generar la Potenciación de Larga Duración (Long-Term Potentiation)?',
      url: '/blog/long-term-potentiation',
    },
  ];

  const linksTeacher = [
    {
      text: 'Manual de ética para dar clases en la plataforma Openmind',
      url: '/blog/ethics-manual-for-teaching',
    },
    {
      text: 'Pautas para el perfil de docente',
      url: '/blog/guidelines-teacher-profile',
    },
    {
      text: 'Pautas para la imagen de perfil del docente',
      url: '/blog/teacher-profile-guidelines',
    },
    {
      text: 'Restricción y remoción de maestros',
      url: '/blog/removal-of-teachers',
    },
    {
      text: 'Política de redes sociales para maestros',
      url: '/blog/social-media-policy',
    },
    {
      text: ' ¿Como evaluar a mis alumnos para recibir pagos en Openmind?',
      url: '/blog/evaluate-to-receive-payments',
    },
    {
      text: 'Seguridad y privacidad del alumno',
      url: '/blog/student-safety-privacy',
    },
  ];

  const linksStudent = [
    {
      text: 'Guía de privacidad del alumno',
      url: '/blog/student-privacy-guide',
    },
  ];

  return {
    linksOpenMind,
    linksStudent,
    linksTeacher
  };
};
