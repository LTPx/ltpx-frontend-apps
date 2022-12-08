import type { ComponentMeta } from '@storybook/react';
import { Sidebar } from './sidebar';

const Story: ComponentMeta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Sidebar',
};
export default Story;

const links = [
  {
    title: 'Dashboard',
    url: '/',
    icon: {
      icon: 'dashboard',
      size: 20,
      color: '#8a94a6'
    }
  },
  {
    title: 'My Account',
    url: '/account',
    icon: {
      icon: 'user-account',
      size: 20,
      color: '#8a94a6'
    }
  },
  {
    title: 'My Wallet',
    url: '/wallet',
    icon: {
      icon: 'wallet',
      size: 20,
      color: '#8a94a6'
    }
  },
  {
    title: 'My Courses',
    url: '/courses',
    icon: {
      icon: 'book-open',
      size: 20,
      color: '#8a94a6'
    }
  }
]

export const Default = () => {
  return (
    <div style={{width: '300px'}}>
      <Sidebar links={links} />
    </div>
  )
};
