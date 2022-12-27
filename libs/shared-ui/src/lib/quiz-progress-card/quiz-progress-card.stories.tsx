import type { ComponentMeta } from '@storybook/react';
import { QuizProgressCard } from './quiz-progress-card';

const Story: ComponentMeta<typeof QuizProgressCard> = {
  component: QuizProgressCard,
  title: 'QuizProgressCard',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <QuizProgressCard percentage={80} text={'Completed'} />
    </div>
  );
};
