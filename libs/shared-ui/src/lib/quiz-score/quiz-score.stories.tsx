import type { ComponentMeta } from '@storybook/react';
import { QuizScore } from './quiz-score';

const Story: ComponentMeta<typeof QuizScore> = {
  component: QuizScore,
  title: 'QuizScore',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <QuizScore
        totalScore={80}
        message={'You pass with score about minimum, congratulations!'}
      />
    </div>
  );
};
