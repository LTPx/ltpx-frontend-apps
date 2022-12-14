import type {ComponentMeta } from '@storybook/react';
import { UserCourseCard } from './user-course-card';

const Story: ComponentMeta<typeof UserCourseCard> = {
  component: UserCourseCard,
  title: 'UserCourseCard',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <UserCourseCard image='https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbWluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'startDate='10 of February' title='Programing' progress={40}/>
    </div>
  )
};