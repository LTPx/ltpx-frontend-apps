import { INewPassword } from '@ltpx-frontend-apps/api';
import type { ComponentMeta } from '@storybook/react';
import { ChangePasswordForm } from './change-password-form';

const Story: ComponentMeta<typeof ChangePasswordForm> = {
  component: ChangePasswordForm,
  title: 'ChangePasswordForm',
};
export default Story;

const clickFunction = () => {
  console.log('click');
};

export const Card = () => {
  return (
    <div>
      <ChangePasswordForm onSubmit={clickFunction}/>
    </div>
  )
};