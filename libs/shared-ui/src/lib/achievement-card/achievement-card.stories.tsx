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
      <AchievementCard/>
    </div>
  )
};