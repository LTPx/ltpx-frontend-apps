import type { ComponentMeta } from '@storybook/react';
import { ApplyTeacherForm } from './apply-teacher-form';

const Story: ComponentMeta<typeof ApplyTeacherForm> = {
  component: ApplyTeacherForm,
  title: 'ApplyTeacherForm',
};
export default Story;
const clickFunction = () => {
  console.log('click');
};

export const form = () => {
  return (
    <div>
      <ApplyTeacherForm onSubmitForm={clickFunction} />
    </div>
  );
};
