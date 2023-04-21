import { PostDisplay } from '../../components/home/types';
import { faker } from '@faker-js/faker';
export function createFakePostDisplay(
  props?: Partial<PostDisplay>,
): PostDisplay {
  return {
    id: Number(faker.random.numeric()),
    message: faker.random.words(),
    authorId: Number(faker.random.numeric()),
    createdAt: faker.date.past().toDateString(),
    author: {
      displayName: faker.name.firstName() + faker.name.lastName(),
    },
    ...props,
  };
}
