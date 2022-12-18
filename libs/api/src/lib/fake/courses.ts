import { faker } from '@faker-js/faker';
import { Course } from '../interfaces/course';

const createRandomCourse = ():Course => (
  {
    id: faker.datatype.uuid(),
    image: faker.image.people(640, 480, true),
    title: `Learn how to make a: ${faker.commerce.product()}`,
    description: `Learning: ${faker.commerce.productDescription()}`,
    category: faker.commerce.department(),
    price: faker.datatype.number({min: 10, max: 50}),
    duration: faker.datatype.number(60),
    lessons: faker.datatype.number(8),
    stars: faker.datatype.number(5)
  }
)

export const buildCourses = (amount: number):Course[] => {
  const mocks = Array.from(Array(amount).keys())
  return mocks.map(() => {
    return createRandomCourse();
  })
}
