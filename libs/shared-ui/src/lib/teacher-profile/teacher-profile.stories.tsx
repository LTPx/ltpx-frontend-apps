import type { ComponentMeta } from '@storybook/react';
import { TeacherProfile } from './teacher-profile';

const Story: ComponentMeta<typeof TeacherProfile> = {
  component: TeacherProfile,
  title: 'TeacherProfile',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <TeacherProfile img={''} nameTeacher={''} profession={''} />
    </div>
  );
};
