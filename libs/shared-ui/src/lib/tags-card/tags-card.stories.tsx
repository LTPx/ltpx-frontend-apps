import type { ComponentMeta } from '@storybook/react';
import { TagsCard } from './tags-card';

const Story: ComponentMeta<typeof TagsCard> = {
  component: TagsCard,
  title: 'TagsCard',
};

export default Story;

const tags = [
  { text: 'Course' },
  { text: 'Timeline' },
  { text: 'Moodle' },
  { text: 'Best' },
  { text: 'Info' },
];

export const Default = () => {
  return (
    <div>
      <TagsCard tags={tags} />
    </div>
  );
};
