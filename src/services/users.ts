import * as faker from 'faker';
import { delay } from '../helpers';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export interface ITask {
  id: number;
  userId: number;
  title: string;
  description: string;
  score: number;
}

export interface IFetchedUser
  extends IUser {
  tasks: ITask[];
}

const createFakeUsers = () => {
  let userId = 0;
  let taskId = 0;

  return [22, 19, 25, 31, 36, 28, 30]
    .map(age => ({
      age,
      id: ++userId,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      tasks: Array
        .from({
          length: faker.random.number({
            min: 1,
            max: 7
          })
        })
        .map(() => ({
          userId,
          id: ++taskId,
          title: faker.lorem.words(),
          description: faker.lorem.sentences(1),
          score: faker.random.number({
            min: 3.5,
            max: 5,
            precision: 0.01
          })
        }))
    }))
};

export const listUsers =
  (): Promise<IFetchedUser[]> =>
    delay(faker.random.number({
      min: 500,
      max: 800
    }))
      .then(createFakeUsers);
