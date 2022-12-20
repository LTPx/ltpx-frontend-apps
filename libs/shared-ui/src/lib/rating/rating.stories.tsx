import type {ComponentMeta } from '@storybook/react';
import { Rating } from './rating';

const Story: ComponentMeta<typeof Rating> = {
  component: Rating,
  title: 'Rating',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <Rating stars={3}/>
    </div>
  )
};