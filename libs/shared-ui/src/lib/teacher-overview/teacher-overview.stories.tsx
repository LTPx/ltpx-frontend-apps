import type {ComponentMeta } from '@storybook/react';
import { TeacherOverview } from './teacher-overview';

const Story: ComponentMeta<typeof TeacherOverview> = {
  component: TeacherOverview,
  title: 'TeacherOverview',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <TeacherOverview 
      image='https://images.unsplash.com/photo-1642792743923-3fc2adcd1b84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
      name={'Daniel Handerson'} 
      profession={'IOS Developer & UI Designer'} 
      rating={4.87} 
      reviews={1533} 
      students={23912} 
      courses={29} 
      bibliography={'I am a UI/UX designer and an IOS developer with having almost six years of experience in application development and also ten years of graphic design an User interface design.'}></TeacherOverview>
    </div>
  )
};