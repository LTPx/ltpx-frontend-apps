import type {ComponentMeta } from '@storybook/react';
import { Select } from './select';

const Story: ComponentMeta<typeof Select> = {
  component: Select,
  title: 'Select',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <Select/>
    </div>
  )
};