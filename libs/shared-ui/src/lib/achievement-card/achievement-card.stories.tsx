import type { ComponentMeta } from '@storybook/react';
import { AchievementCard } from './achievement-card';

const Story: ComponentMeta<typeof AchievementCard> = {
  component: AchievementCard,
  title: 'AchievementCard',
};
export default Story;

export const Card = () => {
  return (
    <div>
      <AchievementCard 
        image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbboFe4oVDFF3wOth6vRoc9ZHmcpJPXDqokA&usqp=CAU'} 
        describe={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}/>
    </div>
  )
};