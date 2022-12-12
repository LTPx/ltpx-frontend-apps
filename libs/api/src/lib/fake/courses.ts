import { faker } from '@faker-js/faker';

const createRandomCourse = () => (
  {
    id: faker.datatype.uuid(),
    image: faker.image.business(640, 480, true),
    title: faker.random.words(4),
    category: faker.word.adjective(),
    price: faker.datatype.number(100),
    duration: faker.datatype.number(60),
    lessons: faker.datatype.number(8),
    stars: faker.datatype.number(5)
  }
)

export const buildCourses = (amount: number) => {
  const mocks = Array.from(Array(amount).keys())
  return mocks.map(() => {
    return createRandomCourse();
  })
}
