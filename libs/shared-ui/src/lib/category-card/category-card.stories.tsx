import type { ComponentMeta } from '@storybook/react';
import { CategoryCard } from './category-card';

const Story: ComponentMeta<typeof CategoryCard> = {
  component: CategoryCard,
  title: 'CategoryCard',
};
export default Story;

export const Card = () => {
  return (
    <div>
      <CategoryCard icon={'desktop'} title={'Design'} description={'Over 960 courses'} />
    </div>
  )
};