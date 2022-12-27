import type { ComponentMeta } from '@storybook/react';
import { ProfileUser } from './profile-user';

const Story: ComponentMeta<typeof ProfileUser> = {
  component: ProfileUser,
  title: 'ProfileUser',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <ProfileUser 
        name={'Kathelen Monero'} 
        profession={'Teacher'} 
        rating={4} 
        biography={'Quam fringilla neque morbi porta tempus porta pellentesque. Nibh amet montes, elementum phasellus et. Fermentum neque, nulla tempor consectetur. Sed amet amet mauris sem faucibus nec in vestibulum. Quam fringilla neque morbi porta tempus porta pellentesque. Fermentum neque, nulla tempor consectetur. Sed amet amet mauris sem faucibus nec in vestibulum.'} 
      />
    </div>
  );
};
