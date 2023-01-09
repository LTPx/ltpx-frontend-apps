import type { ComponentMeta } from '@storybook/react';
import { ReviewCourseForm } from './review-course-form';

const Story: ComponentMeta<typeof ReviewCourseForm> = {
  component: ReviewCourseForm,
  title: 'ReviewCourseForm',
};

export default Story;
const rateCourse = [
  { text: 'Sobresaliente' },
  { text: 'Bueno' },
  { text: 'Satisfactorio' },
  { text: 'Pobre' },
];

const rateTeacher = [
  { text: 'Sobresaliente' },
  { text: 'Bueno' },
  { text: 'Satisfactorio' },
  { text: 'Pobre' },
];

const clickFunction = () => {
  console.log('click');
};

export const Form = () => {
  return (
    <div>
      <ReviewCourseForm
        rateCourse={rateCourse}
        rateTeacher={rateTeacher}
        onSubmit={clickFunction}
      />
    </div>
  );
};
