import type { ComponentMeta } from '@storybook/react';
import { CourseStatus, TeacherCourseCard } from './teacher-course-card';

const Story: ComponentMeta<typeof TeacherCourseCard> = {
  component: TeacherCourseCard,
  title: 'TeacherCourseCard',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <TeacherCourseCard
        status={CourseStatus.publish}
        image={
          'https://images.unsplash.com/photo-1561089489-f13d5e730d72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODh8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
        }
        title={'Master Digital Product Design'}
        learners={1}
        category={'desing'}
        percentageRate={60}
        percentageLearner={40}
      />
      <br />
      <TeacherCourseCard
        status={CourseStatus.draft}
        image={
          'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
        }
        title={'Master Digital Product Design'}
        learners={0}
        category={'desing'}
        percentageRate={0}
        percentageLearner={0}
      />
    </div>
  );
};
