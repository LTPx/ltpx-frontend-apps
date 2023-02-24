import type { ComponentMeta } from '@storybook/react';
import { RegisterForm } from './register-form';

const Story: ComponentMeta<typeof RegisterForm> = {
  component: RegisterForm,
  title: 'RegisterForm',
};

export default Story;

const clickFunction = () => {
  console.log('click');
};
export const Default = () => {
  return (
    <div>
      <RegisterForm onSubmit={clickFunction} />
    </div>
  );
};
