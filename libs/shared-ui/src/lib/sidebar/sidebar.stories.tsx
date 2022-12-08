import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sidebar } from './sidebar';

const Story: ComponentMeta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Sidebar',
};
export default Story;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  links: [
    {
      title: 'Dashboard',
      url: '/dashboard'
    },
    {
      title: 'My Account',
      url: '/account'
    },
    {
      title: 'My Wallet',
      url: '/wallet'
    },
    {
      title: 'My Courses',
      url: '/courses'
    }
  ]
};
