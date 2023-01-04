import type { ComponentMeta } from '@storybook/react';
import { NotFound } from './not-found';

const Story: ComponentMeta<typeof NotFound> = {
  component: NotFound,
  title: 'NotFound',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <NotFound/>
    </div>
  );
};