import { QuizModel, QuizParams } from '@ltpx-frontend-apps/api';
import {
  BasicRow,
  Button,
  ColorsButton,
  QuizBuilder,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResponseRequest } from '../../teacher-edit-course/teacher-edit-course';
import styles from './course-quizzes.module.scss';

/* eslint-disable-next-line */
export interface CourseQuizzesProps {
  onSubmit: (data: ResponseRequest) => void;
}

export function CourseQuizzes(props: CourseQuizzesProps) {
  const { onSubmit } = props;
  const [quizEdit, setQuizEdit] = useState<QuizModel>();
  const [showForm, setShowForm] = useState(false);
  const { course, _removeQuiz, _addQuiz, _updateQuiz } = useCourse();
  const { quizzes } = course;
  const { t } = useTranslation();

  const handleSaveQuiz = async (quiz: QuizParams) => {
    const response = quiz.id
      ? await _updateQuiz({ ...quiz, ...{ id: quiz.id } })
      : await _addQuiz(quiz);
    const { success } = response;
    if (success) {
      onSubmit(response);
      setShowForm(false);
      setQuizEdit(undefined);
    } else {
      onSubmit(response);
    }
  };

  const handleRemoveQuiz = async (id: number) => {
    try {
      const { data } = await _removeQuiz(id);
      onSubmit &&
        onSubmit({
          success: true,
          data: data,
        });
      setShowForm(false);
    } catch (error: any) {
      onSubmit &&
        onSubmit({
          success: false,
          error: error,
        });
    }
  };

  return (
    <div className="quiz-section">
      <div className={styles['header-text']}>
        <h2>{t('courseQuizzes.title')}</h2>
        <h4 className="muted">{t('courseQuizzes.subtitle')}</h4>
      </div>
      {!showForm && (
        <div className={styles['quizzes']}>
          {quizzes?.map((quiz, index) => (
            <BasicRow
              title={quiz.name}
              subtitle={quiz.questions_attributes.length + ' preguntas'}
              icon="list"
              key={index}
              onClick={() => {
                setQuizEdit(quiz);
                setShowForm(true);
              }}
              remove={() => {
                handleRemoveQuiz(quiz.id);
              }}
            />
          ))}
        </div>
      )}
      {!showForm && quizzes?.length === 0 && (
        <SetupCard
          onClick={() => {
            setShowForm(true);
          }}
          icon={'paper-outline'}
          text={t('courseQuizzes.text')}
          titleButton={t('buttons.config') || ''}
        />
      )}
      {!showForm && quizzes && quizzes.length > 0 && (
        <div className={styles['button-content']}>
          <Button
            title={t('buttons.test')}
            className={styles['add-button']}
            outline={true}
            color={ColorsButton.secondary}
            onClick={() => {
              setShowForm(true);
            }}
          />
        </div>
      )}
      {showForm && (
        <>
          <QuizBuilder
            quiz={quizEdit}
            className={styles['quiz-forms']}
            onSubmit={(data) => {
              handleSaveQuiz(data);
            }}
            onClose={() => {
              setShowForm(false);
              setQuizEdit(undefined);
            }}
          />
          {!quizEdit && (
            <div className={styles['button-content']}>
              <Button
                title={t('buttons.cancel')}
                className={styles['add-button']}
                color={ColorsButton.accent}
                onClick={() => {
                  setShowForm(false);
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CourseQuizzes;
