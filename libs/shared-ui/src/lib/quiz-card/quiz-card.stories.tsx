import { CourseStatus } from '@ltpx-frontend-apps/api';
import type { ComponentMeta } from '@storybook/react';
import { QuizCard } from './quiz-card';

const Story: ComponentMeta<typeof QuizCard> = {
  component: QuizCard,
  title: 'QuizCard',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <QuizCard
        status={CourseStatus.publish}
        image={
          'https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3Vyc298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
        }
        title={'Master'}
        learners={1}
        category={'Design'}
        url={''}
        totalQuestions={20}
        totalAnswers={15}
      />
    </div>
  );
};
