import type {ComponentMeta } from '@storybook/react';
import { Select } from './select';

const Story: ComponentMeta<typeof Select> = {
  component: Select,
  title: 'Select',
};

const sortByOptions = [
  {value: 'price', text: 'Price'},
  {value: 'level', text: 'level'},
  {value: 'rating', text: 'Rating'},
]
export default Story;

export const Default = () => {
  return (
    <div>
      <Select options={sortByOptions}/>
    </div>
  )
};