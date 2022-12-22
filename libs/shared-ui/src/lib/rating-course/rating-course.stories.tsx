import type { ComponentMeta } from '@storybook/react';
import { RatingCourse } from './rating-course';

const Story: ComponentMeta<typeof RatingCourse> = {
  component: RatingCourse,
  title: 'RatingCourse',
};

const ratings = [
  { stars: 5, reviewers: 10 },
  { stars: 4, reviewers: 8 },
  { stars: 3, reviewers: 6 },
  { stars: 2, reviewers: 4 },
  { stars: 1, reviewers: 2 },
];

export default Story;

export const Default = () => {
  return (
    <div>
      <RatingCourse ratings={ratings}></RatingCourse>
    </div>
  );
};
