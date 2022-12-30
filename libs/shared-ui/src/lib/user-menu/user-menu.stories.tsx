import type { ComponentMeta } from '@storybook/react';
import { UserMenu } from './user-menu';

const Story: ComponentMeta<typeof UserMenu> = {
  component: UserMenu,
  title: 'UserMenu',
};

export default Story;

const links = [
  { icon: 'user', text: 'Profile', url: '' },
  { icon: 'store', text: 'Grades', url: '' },
  { icon: 'chat-dots', text: 'Messages', url: '' },
  { icon: 'cog', text: 'Preferences', url: '' },
  { icon: 'log-out', text: 'Log out', url: '' },
];
export const Default = () => {
  return (
    <div>
      <UserMenu
        image={
          'https://images.unsplash.com/flagged/photo-1559475555-b26777ed3ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
        }
        links={links}
        name={'Ali Tufan'}
        email={'ali@skola.com'}
      />
    </div>
  );
};
