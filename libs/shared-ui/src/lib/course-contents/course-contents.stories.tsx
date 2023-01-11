import type { ComponentMeta } from '@storybook/react';
import { CourseContents } from './course-contents';

const Story: ComponentMeta<typeof CourseContents> = {
  component: CourseContents,
  title: 'CourseContents',
};

export default Story;

const contents = [
  {
    title: 'Automotive',
    description: 'The Football Is Good For Training And Recreational Purposes',
  },
  {
    title: 'Shoes',
    description:
      'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
  },
];

export const Content = () => {
  return (
    <div>
      <CourseContents contents={contents} />
    </div>
  );
};
