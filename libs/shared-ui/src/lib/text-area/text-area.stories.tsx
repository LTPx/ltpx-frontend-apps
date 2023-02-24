import type {ComponentMeta } from '@storybook/react';
import { TextArea } from './text-area';

const Story: ComponentMeta<typeof TextArea> = {
  component: TextArea,
  title: 'TextArea',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <TextArea rows={10} cols={30}></TextArea>
    </div>
  )
};