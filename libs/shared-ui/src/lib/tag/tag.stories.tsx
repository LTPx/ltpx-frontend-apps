import type { ComponentMeta } from '@storybook/react';
import { ColorsTag, Tag } from './tag';

const Story: ComponentMeta<typeof Tag> = {
  component: Tag,
  title: 'Tag',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <Tag text={'gray'} />
      <br />
      <Tag text="green" color={ColorsTag.green}></Tag>
    </div>
  );
};
