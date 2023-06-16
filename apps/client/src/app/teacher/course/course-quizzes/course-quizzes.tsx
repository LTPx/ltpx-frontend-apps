import {
  FormatResponse,
  QuizModel,
  QuizParams,
  TypeQuestionQuiz,
} from '@ltpx-frontend-apps/api';
import {
  BasicRow,
  Button,
  ColorsButton,
  QuizBuilder,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse, useCourseUtil } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './course-quizzes.module.scss';
import { Dialog } from 'evergreen-ui';

/* eslint-disable-next-line */
export interface CourseQuizzesProps {
  onSubmit: (data: FormatResponse) => void;
}

export function CourseQuizzes(props: CourseQuizzesProps) {
  const { onSubmit } = props;
  const [quizEdit, setQuizEdit] = useState<QuizModel>();
  const [quizSelected, setQuizSelected] = useState<QuizModel>();
  const [showForm, setShowForm] = useState(false);
  const { course, _removeQuiz, _addQuiz, _updateQuiz } = useCourse();
  const { quizzes } = course;
  const [openTest, setOpenTest] = useState(false);
  const { t } = useTranslation();
  const { translateOption } = useCourseUtil();

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
              onClickReview={() => {
                setOpenTest(true);
                setQuizSelected(quiz);
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
      <Dialog
        isShown={openTest}
        hasClose={true}
        hasFooter={false}
        title={quizSelected?.name}
        onCloseComplete={() => setOpenTest(false)}
        shouldCloseOnOverlayClick={false}
        width={'55vw'}
      >
        <div className={styles['test-wrap']}>
          {quizSelected &&
            quizSelected.questions_attributes.map((question, index) => (
              <div className={styles['test']} key={index}>
                <div className={styles['title-content']}>
                  <h4 className={styles['title-test']}>
                    {index + 1}. {question.question}
                  </h4>
                  <h4 className={styles['points-test']}>
                    Puntos: ({question.points})
                  </h4>
                </div>
                <h4 className={styles['description-test']}>
                  {question.description}
                </h4>
                {question.answers_attributes.map((answer, index) => (
                  <div key={index}>
                    {question.kind === TypeQuestionQuiz.conditional ? (
                      <h4 className={styles['options-test']}>
                        {translateOption(answer.text)}
                      </h4>
                    ) : (
                      <div className={styles['options-test']}>
                        <h4>{answer.text}</h4>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          <div className={styles['footer']}>
            <Button
              color={ColorsButton.primary}
              onClick={() => setOpenTest(false)}
              title={'Cerrar'}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CourseQuizzes;
