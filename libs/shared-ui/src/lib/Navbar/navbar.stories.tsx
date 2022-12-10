import type { ComponentMeta } from '@storybook/react';
import { Navbar } from './navbar';

const Story: ComponentMeta<typeof Navbar> = {
  component: Navbar,
  title: 'Navbar',
};
export default Story;

const links = [
  {
    title: 'Dashboard',
    url: '/',
    icon: {
      icon: 'dashboard',
      size: 20,
    }
  },
  {
    title: 'My Account',
    url: '/account',
    icon: {
      icon: 'user-account',
      size: 20,
    }
  },
  {
    title: 'My Wallet',
    url: '/wallet',
    icon: {
      icon: 'wallet',
      size: 20,
    }
  },
  {
    title: 'My Courses',
    url: '/courses',
    icon: {
      icon: 'book-open',
      size: 20,
    }
  }
]

export const Default = () => {
  return (
    <div style={{width: '300px'}}>
      <Navbar links={links} />
    </div>
  )
};
