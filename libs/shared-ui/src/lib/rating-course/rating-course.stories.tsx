import type {ComponentMeta } from '@storybook/react';
import { RatingCourse } from './rating-course';

const Story: ComponentMeta<typeof RatingCourse> = {
  component: RatingCourse,
  title: 'RatingCourse',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <RatingCourse></RatingCourse>
    </div>
  )
};