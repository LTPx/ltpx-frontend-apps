import type { ComponentMeta } from '@storybook/react';
import { QuestionOneOption } from './question-one-option';

const Story: ComponentMeta<typeof QuestionOneOption> = {
  component: QuestionOneOption,
  title: 'QuestionOneOption',
};

export default Story;

const options = [
  {text:"Text Tool"},
  {text:"Move Tool"},
  {text:"Shape Tool"},
  {text:"Frame Tool"},
]

export const Default = () => {
  return (
    <div style={{padding: '2rem', width: '25rem'}}>
      <QuestionOneOption 
        tag={'Question 15'}
        question={'What tool you use to make a shape?'} 
        options={options}      
      />
    </div>
  );
};