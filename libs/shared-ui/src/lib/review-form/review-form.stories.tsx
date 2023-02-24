import type {ComponentMeta } from '@storybook/react';
import { ReviewForm } from './review-form';

const Story: ComponentMeta<typeof ReviewForm> = {
  component: ReviewForm,
  title: 'ReviewForm',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <ReviewForm/>
    </div>
  )
};