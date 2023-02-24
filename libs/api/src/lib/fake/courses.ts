import { faker } from '@faker-js/faker';
import { CourseLanguage, CourseLevel, PublicCourse, TeacherClassType } from '../interfaces/course-interface';

const createRandomCourse = ():PublicCourse => (
  {
    id: faker.datatype.number(500),
    cover: faker.image.people(640, 480, true),
    title: `Learning how to: ${faker.commerce.product()}`,
    description: `Learning: ${faker.commerce.productDescription()}`,
    category: faker.commerce.department(),
    price_cents: faker.datatype.number({min: 1000, max: 5000}),
    contents_count: faker.datatype.number(8),
    average_rating: faker.datatype.number(5),
    level: CourseLevel.begging,
    language: CourseLanguage.en,
    contents: [],
    quizzes: [],
    sessions: [],
    learn_goals: `Learning: ${faker.commerce.productDescription()}`,
    enrollments_count: 12,
    requirements: 'No one',
    price: faker.datatype.number({min: 1000, max: 5000}).toString(),
    price_currency: 'USD',
    price_format: '$10.00',
    course_session_id: 12,
    classroom: {
      condition: TeacherClassType.flexible,
      min: 1,
      max: 10,
      call_time_min: 45,
      meetings:[]
    }
  }
)


const createRandomCourseDetail = () => (
  {
    course: {
      id: faker.datatype.uuid(),
      image: faker.image.people(640, 480, true),
      title: `Learn how to make a: ${faker.commerce.product()}`,
      description: `Learning: ${faker.commerce.productDescription()}`,
      discount: faker.datatype.number({min: 5, max: 50}),
      category: faker.commerce.department(),
      price: faker.datatype.number({min: 1000, max: 5000}),
      duration: faker.datatype.number(60),
      lessons: faker.datatype.number(8),
      stars: faker.datatype.number(5),
      achievements: faker.datatype.number(5),
      enrolled: faker.datatype.number(15),
      skillLevel: 'advance',
      language: 'en',
      certificate: true,
      learn_goals: [`Learn: ${faker.commerce.product()}`, `Learn: ${faker.commerce.product()}`, `Learn: ${faker.commerce.product()}`],
      requirements: ['Good Internet', 'Free time', 'Laptop']
    },
    overview: {
      description: `In this course: ${faker.commerce.productDescription()}`,
      goals: [`Learning: ${faker.commerce.productDescription()}`, `Practice: ${faker.commerce.productDescription()}`, `Prepare: ${faker.commerce.productDescription()}`],
      requirements: [`A laptop`, `Good Internet`, `Be able to attend to class`],
    },
    curriculum: [],
    instructor: {
      name: 'Martha Wright',
      profession: 'Educational teacher',
      image: faker.image.people(640, 480, true),
      courses: faker.datatype.number(10),
      stars: faker.datatype.number(5),
      students: faker.datatype.number(15),
      reviews: faker.datatype.number(15),
      biography: `I am: ${faker.commerce.productDescription()}`
    },
    ratings: [
      { stars: 5, reviewers: faker.datatype.number(10)},
      { stars: 4, reviewers: faker.datatype.number(10)},
      { stars: 3, reviewers: faker.datatype.number(5)},
      { stars: 2, reviewers: faker.datatype.number(2)},
      { stars: 1, reviewers: faker.datatype.number(5)},
    ],
    comments: [
      {
        name: 'Martha Wright',
        image: faker.image.people(640, 480, true),
        title: 'Great Course',
        comment: `This course: ${faker.commerce.productDescription()}`,
        date: 'a mont ago'
      },
      {
        name: 'Paul Wright',
        image: faker.image.people(640, 480, true),
        title: 'Awesome Course',
        comment: `This course: ${faker.commerce.productDescription()}`,
        date: '3 days ago'
      }
    ],
    contents: [
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
    ],
  }
)

const createRandomTeacherCourseDetail = () => (
  {
    entity: {
      id: faker.datatype.uuid(),
      image: faker.image.people(640, 480, true),
      title: `Learn how to make a: ${faker.commerce.product()}`,
      description: `Learning: ${faker.commerce.productDescription()}`,
      category: 'Science',
      level: 'Advance',
      language: 'English',
      willLearn: faker.commerce.productDescription(),
      requirements: faker.commerce.productDescription(),
      status: 'published'
    },
    contents: [
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
      {
        title: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      },
    ],
    quiz: [
      {
        question: 'Que es el universo?',
        description: 'Utilice una definicion corta',
        questionType: 'answer'
      },
      {
        question: 'El planeta Tierra que contiene?',
        description: 'Seleccione las respuestas correctas',
        questionType: 'multiple',
        answers: [
          {
            answer: 'Animales',
            correct: true
          },
          {
            answer: 'Galaxias',
            correct: false
          },
          {
            answer: 'Personas',
            correct: true
          },          {
            answer: 'Sol',
            correct: false
          }
        ]
      },
      {
        question: 'Saturno esta a la distancia de',
        description: 'Seleccione la respuesta correcta',
        questionType: 'multiple',
        answers: [
          {
            answer: '200 años luz',
            correct: true
          },
          {
            answer: '1200 años luz',
            correct: false
          },
          {
            answer: '300 años luz',
            correct: false
          },          {
            answer: '100 años luz',
            correct: false
          }
        ]
      },
      {
        question: 'Es verdad que la luz del sol se apagara en 200 años',
        description: '',
        questionType: 'conditional',
        answer: {
          true: false,
          false: true,
        }
      },
    ],
    achievements: [
      {
        title: 'Buen Inicio',
        rule: 'by-quiz',
        entity: 'quizzes',
        selectedIds: ['1'],
      },
      {
        title: 'Excelente Avance',
        rule: 'by-content',
        entity: 'contents',
        selectedIds: ['5'],
      }
    ]
  }
)

export const buildCourses = (amount: number):PublicCourse[] => {
  const mocks = Array.from(Array(amount).keys())
  return mocks.map(() => {
    return createRandomCourse();
  })
}

export const buildCourseDetails = () => {
  return createRandomCourseDetail();
}

export const buildRandomTeacherCourseDetail = () => {
  return createRandomTeacherCourseDetail();
}
