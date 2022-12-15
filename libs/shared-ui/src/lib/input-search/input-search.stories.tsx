import type {ComponentMeta } from '@storybook/react';
import { InputSearch } from './input-search';

const Story: ComponentMeta<typeof InputSearch> = {
  component: InputSearch,
  title: 'InputSearch',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <InputSearch/>
    </div>
  )
};