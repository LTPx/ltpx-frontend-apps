import type {ComponentMeta } from '@storybook/react';
import { InputSearch, InputSearchProps } from './input-search';

const Story: ComponentMeta<typeof InputSearch> = {
  component: InputSearch,
  title: 'InputSearch',
};

export default Story;

export const Default = () => {
  const props:InputSearchProps = {
    onChange: () => {console.log('CHANGING.....');},
    type: 'text',
    placeholder: 'Search...',
    disabled: false,
  };

  return (
    <div>
      <InputSearch type={props.type} placeholder={props.placeholder}/>
    </div>
  )
};