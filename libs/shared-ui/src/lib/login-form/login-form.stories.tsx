import type { ComponentMeta } from '@storybook/react';
import { LoginForm } from './login-form';

const Story: ComponentMeta<typeof LoginForm> = {
  component: LoginForm,
  title: 'LoginForm',
};

export default Story;

const clickFunction = () => {
  console.log('click');
};
export const Default = () => {
  return (
    <div>
      <LoginForm onSubmit={clickFunction} />
    </div>
  );
};
