import type {ComponentMeta } from '@storybook/react';
import { ProgressBar } from './progress-bar';

const Story: ComponentMeta<typeof ProgressBar> = {
  component: ProgressBar,
  title: 'ProgressBar',
};

export default Story;

export const Progress = () => {
  return (
    <div>
      <ProgressBar percentage={40} text='in progress'/>
    </div>
  )
};