import { IUserAccount } from '@ltpx-frontend-apps/api';
import type { ComponentMeta } from '@storybook/react';
import { UserAccountForm } from './user-account-form';

const Story: ComponentMeta<typeof UserAccountForm> = {
  component: UserAccountForm,
  title: 'UserAccountForm',
};

export default Story;

const clickFunction = () => {
  console.log('click');
};
export const Default = () => {
  return (
    <div>
      <UserAccountForm onSubmit={clickFunction}></UserAccountForm>
    </div>
  );
};
