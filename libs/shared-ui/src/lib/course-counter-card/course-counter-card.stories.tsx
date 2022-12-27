import type { ComponentMeta } from '@storybook/react';
import { CourseCounterCard } from './course-counter-card';

const Story: ComponentMeta<typeof CourseCounterCard> = {
  component: CourseCounterCard,
  title: 'CourseCounterCard',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <CourseCounterCard 
        count={15} 
        text={'Courses Completed'} 
      />
    </div>
  );
};