import { faker } from '@faker-js/faker';

const users = {
  12: {
    userId: '12',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Alison Wright',
  },
  13: {
    userId: '13',
    image: 'https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80',
    name: 'Michelle Wood',
  }
};

const createRandomMessage = () => (
  {
    userId: faker.datatype.number({min:10, max:13}).toString(),
    image: faker.image.business(640, 480, true),
    name: faker.internet.userName(),
    message: faker.random.words(4),
  }
)

export const getCurrentChatUser = () => (
  users[13]
)

export const generateConversation = (amountMessages: number) => {
  const messagesMocks = Array.from(Array(amountMessages).keys());
  return messagesMocks.map(() => {
    let message = createRandomMessage();
    if (message.userId === '12') {
      message = Object.assign(message, users[12]);
    }
    if (message.userId === '13') {
      message = Object.assign(message, users[13]);
    }
    return message;
  })
}
