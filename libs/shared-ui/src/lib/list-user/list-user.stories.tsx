import type { ComponentMeta } from '@storybook/react';
import { ListUser } from './list-user';

const Story: ComponentMeta<typeof ListUser> = {
  component: ListUser,
  title: 'ListUser',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <ListUser></ListUser>
    </div>
  );
};
