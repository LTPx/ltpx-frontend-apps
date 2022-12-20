import type { ComponentMeta } from '@storybook/react';
import { RatingCourse } from './rating-course';

const Story: ComponentMeta<typeof RatingCourse> = {
  component: RatingCourse,
  title: 'RatingCourse',
};

const ratings = [
  { starsNumber: 5, reviewersNumber: 10 },
  { starsNumber: 4, reviewersNumber: 8 },
  { starsNumber: 3, reviewersNumber: 6 },
  { starsNumber: 2, reviewersNumber: 4 },
  { starsNumber: 1, reviewersNumber: 2 },
];

export default Story;

export const Default = () => {
  return (
    <div>
      <RatingCourse ratings={ratings}></RatingCourse>
    </div>
  );
};
