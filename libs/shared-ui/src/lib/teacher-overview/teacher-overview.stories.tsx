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