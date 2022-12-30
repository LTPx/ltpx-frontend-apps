import type {ComponentMeta } from '@storybook/react';
import { LearnersTable } from './learners-table';

const Story: ComponentMeta<typeof LearnersTable> = {
  component: LearnersTable,
  title: 'LearnersTable',
};

export default Story;

const users = [
  { image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60', name: 'Kristian Watson', date: 'Dec 29, 2021', percentage: 20 },
  { image: 'https://images.unsplash.com/photo-1642792743923-3fc2adcd1b84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60', name: 'Jhonatan Doe', date: 'Dec 29, 2021', percentage: 40 },
  { image: 'https://images.unsplash.com/flagged/photo-1574110906643-8311b0ce29d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60', name: 'Jacob Jones', date: 'Dec 29, 2021', percentage: 60 },
  { image: 'https://images.unsplash.com/photo-1602133187081-4874fdbd555c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60', name: 'Teresa Web', date: 'Dec 29, 2021', percentage: 80 },
];

export const Default = () => {
  return (
    <div>
      <LearnersTable users={users}/>
    </div>
  )
};