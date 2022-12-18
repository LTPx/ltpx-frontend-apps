import { faker } from '@faker-js/faker';

const createRandomClasses = () => (
  {
    id: faker.datatype.uuid(),
    title: faker.random.words(3),
    teacher: {
      name: faker.internet.userName(),
      image: faker.image.people(640, 480, true),
    },
    status: 'live',
    duration: faker.datatype.number(60),
    startTime: faker.datatype.datetime(),
  }
)

export const buildClasses = (amount: number) => {
  const mocks = Array.from(Array(amount).keys())
  return mocks.map(() => {
    return createRandomClasses();
  })
}
