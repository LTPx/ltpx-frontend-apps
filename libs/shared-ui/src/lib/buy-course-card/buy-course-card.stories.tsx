import type { ComponentMeta } from '@storybook/react';
import { BuyCourseCard } from './buy-course-card';

const Story: ComponentMeta<typeof BuyCourseCard> = {
  component: BuyCourseCard,
  title: 'BuyCourseCard',
};
export default Story;

const clickFunction = () => {
  console.log('click')
};

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
        certificate={true}
        image={'"https://magazine.startus.cc/wp-content/uploads/2018/07/bitcoin-2643159_1920-e1533112613226.jpg"'}
        onClickBuy={clickFunction} 
        onClickEnroll={clickFunction}      
      />
    </div>
  )
};