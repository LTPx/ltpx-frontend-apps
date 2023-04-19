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
  attempts?: number;
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
    attempts,
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
              {!!score && (
                <Icon
                  icon={approved ? 'checkmark-filled' : 'close-circle'}
                  size={16}
                  color={approved ? '#10b981' : '#ef4444'}
                />
              )}
              {score !== undefined && score === 0 && (
                <Icon icon={'close-circle'} size={16} color={'#ef4444'} />
              )}
              <h4 className={styles['title']}>{title}</h4>
            </div>
            <h4 className={styles['subTitle']}>test</h4>
          </div>
          <div className={styles['row-buttons']}>{children}</div>
        </div>
        <div className={styles['info-content']}>
          <div className={styles['item']}>
            <h5 className={styles['item-title']}>Preguntas</h5>
            <h5>{totalQuestions}</h5>
          </div>
          <div className={styles['item']}>
            <h5 className={styles['item-title']}>Puntaje mínimo</h5>
            <h5>{approveScore} / 100 Pts</h5>
          </div>
          <div className={styles['item']}>
            <h5 className={styles['item-title']}>Numero de Intentos</h5>
            <h5>0 / {attempts}</h5>
          </div>
          <div className={styles['item']}>
            <h5 className={styles['item-title']}>Enviado</h5>
            {date ? (
              <h5>{moment(date).format('D MMMM YYYY')}</h5>
            ) : (
              <h5>Aun no Enviada</h5>
            )}
          </div>
        </div>
        {feedback && (
          <div className={styles['feedback']}>
            <div>
              <Avatar src={enrolledCourse.teacher?.profile_image} size={45} />
            </div>
            <div>
              {feedback.length > 130 ? (
                <div className={styles['text-content']}>
                  <p className={styles['text-feedback']}>
                    {showMore ? feedback : `${feedback.substring(0, 130)}....`}
                    <em
                      className={styles['show']}
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? 'Mostrar menos' : 'Mostrar mas'}
                    </em>
                  </p>
                </div>
              ) : (
                <p className={styles['text-feedback']}>{feedback}</p>
              )}
            </div>
          </div>
        )}
        <div className={styles['msg-score']}>
          {!!score && (
            <div>
              {approved ? (
                <h4 className={styles['approved']}>{score} / 100 Pts</h4>
              ) : (
                <h4 className={styles['no-approved']}>{score} / 100 Pts</h4>
              )}
            </div>
          )}
          {score !== undefined && score === 0 && (
            <h4 className={styles['no-approved']}>{score} / 100 Pts</h4>
          )}
          {!score && score !== 0 && (
            <h4 className={styles['empty-test']}>0 / 100 Pts</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizStudentCard;
