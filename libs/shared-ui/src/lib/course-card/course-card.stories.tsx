import type {ComponentMeta } from '@storybook/react';
import { CourseCard } from './course-card';

const Story: ComponentMeta<typeof CourseCard> = {
  component: CourseCard,
  title: 'CourseCard',
};

export default Story;

export const Card = () => {
  return (
    <div>
      <CourseCard image='https://plus.unsplash.com/premium_photo-1661778021952-65997d03b2b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
        category='food'
        title='Mexican Food'
        price={20}
        duration={90}
        lessons={2}
        stars={4}/>
    </div>
  )
};