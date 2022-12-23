import { faker } from '@faker-js/faker';
import { Course } from '../interfaces/course';

const createRandomCourse = ():Course => (
  {
    id: faker.datatype.uuid(),
    image: faker.image.people(640, 480, true),
    title: `Learn how to make a: ${faker.commerce.product()}`,
    description: `Learning: ${faker.commerce.productDescription()}`,
    category: faker.commerce.department(),
    price: faker.datatype.number({min: 1000, max: 5000}),
    duration: faker.datatype.number(60),
    lessons: faker.datatype.number(8),
    stars: faker.datatype.number(5)
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
      skillLevel: 'Expert',
      language: 'English',
      certificate: true,
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
      { stars: 5, reviewers: faker.datatype.number(5)},
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
    ]
  }
)

export const buildCourses = (amount: number):Course[] => {
  const mocks = Array.from(Array(amount).keys())
  return mocks.map(() => {
    return createRandomCourse();
  })
}

export const buildCourseDetails = () => {
  return createRandomCourseDetail();
}
