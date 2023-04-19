import { ReactElement, useState } from 'react';
import Icon from '../icon/icon';
import styles from './quiz-student-card.module.scss';
import moment from 'moment';
import { useStudent } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
moment.locale('es');

/* eslint-disable-next-line */
export interface QuizStudentCardProps {
  title: string;
  totalQuestions?: number;
  score?: number;
  text?: string;
  date?: string;
  feedback?: string;
  approved?: boolean;
  approveScore?: number;
  children?: ReactElement;
}

export function QuizStudentCard(props: QuizStudentCardProps) {
  const {
    title,
    totalQuestions,
    text,
    date,
    children,
    approved,
    score,
    feedback,
    approveScore,
  } = props;
  const { enrolledCourse } = useStudent();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['head-section']}>
          <div className={styles['title-content']}>
            <div className={styles['wrap-title']}>
              <h4 className={styles['title']}>{title}</h4>
              {approved ? (
                <Icon icon={'checkmark-filled'} size={16} color={'#10b981'} />
              ) : (
                <Icon icon={'close-circle'} size={16} color={'#ef4444'} />
              )}
            </div>
            <h4 className={styles['subTitle']}>test</h4>
          </div>
          <div>
            {score ? (
              <div>
                {approved ? (
                  <h4 className={styles['approved']}>{score} / 100 Pts</h4>
                ) : (
                  <h4 className={styles['no-approved']}>{score} / 100 Pts</h4>
                )}
              </div>
            ) : (
              <h4>0 / 100 Pts</h4>
            )}
          </div>
        </div>
        <div className={styles['info-content']}>
          <div className={styles['item']}>
            <h4 className={styles['item-title']}>Preguntas</h4>
            <h4>{totalQuestions}</h4>
          </div>
          <div className={styles['item']}>
            <h4 className={styles['item-title']}>Puntaje mínimo</h4>
            <h4>{approveScore} / 100 Pts</h4>
          </div>
          <div className={styles['item']}>
            <h4 className={styles['item-title']}>Numero de Intentos</h4>
            <h4>0 / 3</h4>
          </div>
          <div className={styles['item']}>
            <h4 className={styles['item-title']}>Enviado</h4>
            <h4>{moment(date).format('D MMMM YYYY')}</h4>
          </div>
        </div>
        {feedback && (
          <div className={styles['feedback']}>
            <div>
              <Avatar src={enrolledCourse.teacher?.profile_image} size={45} />
            </div>
            <div>
              {feedback.length > 150 ? (
                <div className={styles['text-content']}>
                  <p className={styles['text-feedback']}>
                    {showMore ? feedback : `${feedback.substring(0, 150)}....`}
                  </p>
                  <div
                    className={styles['show']}
                    onClick={() => setShowMore(!showMore)}
                  >
                    <h5>{showMore ? 'Mostrar menos' : 'Mostrar mas'}</h5>
                  </div>
                </div>
              ) : (
                <p className={styles['text-feedback']}>{feedback}</p>
              )}
            </div>
          </div>
        )}
        <div className={styles['row-buttons']}>{children}</div>
      </div>
    </div>
  );
}

export default QuizStudentCard;
