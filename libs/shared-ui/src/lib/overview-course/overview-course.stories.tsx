import type { ComponentMeta } from '@storybook/react';
import { OverviewCourse } from './overview-course';

const Story: ComponentMeta<typeof OverviewCourse> = {
  component: OverviewCourse,
  title: 'OverviewCourse',
};

export default Story;

export const Default = () => {
  return (
    <div >
      <OverviewCourse />
    </div>
  );
};