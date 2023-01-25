import { useState } from 'react';
import { Dialog } from 'evergreen-ui';
import AchievementByQuizzesForm from '../achievement-by-quizzes--form/achievement-by-quizzes--form';
import AchievementByScoreForm from '../achievement-by-score-form/achievement-by-score-form';
import AchievementTaskForm from '../achievement-task-form/achievement-task-form';
import Button, { ColorsButton } from '../button/button';
import styles from './achievement-builder.module.scss';

/* eslint-disable-next-line */
export interface AchievementBuilderProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  nameQuiz?: string;
}

export function AchievementBuilder(props: AchievementBuilderProps) {
  const { open, onClose, onSubmit } = props;
  const [openTest, setOpenTest] = useState(false);
  return (
    <Dialog
      isShown={open}
      title="Agregar Achievement"
      onCloseComplete={onClose}
      hasFooter={false}
    >
      <div className={styles['container']}>
        {/* <Button
          title="+ Achievement"
          color={ColorsButton.primary}
          onClick={() => {
            setOpenTest(true);
          }}
        /> */}
        <AchievementByQuizzesForm
          singleSelection={true}
          onSubmit={() => {
            setOpenTest(false);
          }}
        />
        <AchievementTaskForm />
        <AchievementByScoreForm singleSelection={true} />
      </div>
    </Dialog>
  );
}

export default AchievementBuilder;
