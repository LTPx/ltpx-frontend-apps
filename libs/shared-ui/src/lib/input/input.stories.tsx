import type { ComponentMeta } from '@storybook/react';
import { Input, InputProps, Position } from './input';

const Story: ComponentMeta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default Story;

export const Inputs = () => {
  const props:InputProps = {
    onEnter: () => {console.log('CHANGING.....');},
    onChange: () => {console.log('CHANGING.....');},
    onBlur: () => {console.log('CHANGING.....');},
    type: 'text',
    placeholder: 'Typing text...',
    disabled: false,
  };
  return (
    <div className="px-5">
      <Input className = {props.className}  placeholder={props.placeholder}/>
      <br/>
      <Input label = "I am a label" placeholder="placeholder"/>
      <br/>
      <Input label = "Input left addon" placeholder="placeholder" addonInput={{text: '$', position: Position.left}}/>
      <br/>
      <Input label = "Input right addon" placeholder="placeholder" addonInput={{text: '$', position: Position.right}}/>
    </div>
  )
};
