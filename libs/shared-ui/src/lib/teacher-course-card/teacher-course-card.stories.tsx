import type {ComponentMeta } from '@storybook/react';
import { TeacherCourseCard } from './teacher-course-card';

const Story: ComponentMeta<typeof TeacherCourseCard> = {
  component: TeacherCourseCard,
  title: 'TeacherCourseCard',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <TeacherCourseCard/>
    </div>
  )
};