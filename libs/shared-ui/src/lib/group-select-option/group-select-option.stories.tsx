import type {ComponentMeta } from '@storybook/react';
import { GroupSelectOption } from './group-select-option';

const Story: ComponentMeta<typeof GroupSelectOption> = {
  component: GroupSelectOption,
  title: 'GroupSelectOption',
};

export default Story;

const options = [
  {text:"Text Tool"},
  {text:"Move Tool"},
  {text:"Shape Tool"},
  {text:"Frame Tool"},
]

const clickFunction = () => {
  console.log('click');
};

export const Options = () => {
  return (
    <div>
      <GroupSelectOption options={options} onChange={clickFunction}/>
    </div>
  )
};