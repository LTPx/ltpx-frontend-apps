import type { ComponentMeta } from '@storybook/react';
import { BuyCourseCard } from './buy-course-card';

const Story: ComponentMeta<typeof BuyCourseCard> = {
  component: BuyCourseCard,
  title: 'BuyCourseCard',
};
export default Story;

export const Card = () => {
  return (
    <div>
      <BuyCourseCard 
      price={399} 
      discount={20} 
      achievements={4} 
      lectures={10} 
      enrolled={8} 
      language={'English'} 
      skillLevel={'Beginner'} 
      certificate={true}></BuyCourseCard>
    </div>
  )
};