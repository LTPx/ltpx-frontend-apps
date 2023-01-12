import { CourseStatus } from '@ltpx-frontend-apps/api';
import { NavLink } from 'react-router-dom';
import Dropdown from '../dropdown/dropdown';
import Icon from '../icon/icon';
import Menu from '../menu/menu';
import Tag, { ColorsTag } from '../tag/tag';
import styles from './quiz-card.module.scss';

/* eslint-disable-next-line */
export interface QuizCardProps {
  status: CourseStatus;
  image: string;
  title: string;
  learners: number;
  category: string;
  url: string;
  totalQuestions: number;
  totalAnswers: number;
}

export function QuizCard(props: QuizCardProps) {
  const {
    status,
    image,
    title,
    learners,
    category,
    url,
    totalQuestions,
    totalAnswers,
  } = props;

  const calculatePercentage = () => {
    const total = (totalAnswers * 100) / totalQuestions;
    return total;
  };

  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <Tag
          text={status}
          color={
            status === CourseStatus.publish ? ColorsTag.green : ColorsTag.gray
          }
          icon={status === CourseStatus.publish ? 'globe' : 'edit'}
        />
        <Dropdown>
          <Icon icon={'ellipsis-horizontal-outline'} size={15} />
          <Menu
            items={[
              { text: 'Editar curso', icon: 'pencil' },
              { text: 'Ver curso', icon: 'user-group' },
            ]}
          />
        </Dropdown>
      </div>
      <NavLink to={url}>
        <div className={styles['content']}>
          <img src={image} alt="" />
          <div className={styles['information']}>
            <h4>{title}</h4>
            <div className={styles['describe']}>
              <h5>
                <Icon icon={'user'} size={10}></Icon> {learners} estudiantes
              </h5>
              <h5>
                <Icon icon={'box-unpacked'} size={10}></Icon> {category}
              </h5>
            </div>
          </div>
        </div>
      </NavLink>
      <div className={styles['end-content']}>
        {learners > 0 ? (
          <div className={styles['quiz-result']}>
            <h5>Avg Correct Answers</h5>
            <div className={styles['result']}>
              {calculatePercentage() < 50 && (
                <h4 className={styles['answers-red']}>{totalAnswers}</h4>
              )}
              {calculatePercentage() >= 50 && calculatePercentage() < 70 && (
                <h4 className={styles['answers-blue']}>{totalAnswers}</h4>
              )}
              {calculatePercentage() >= 70 && (
                <h4 className={styles['answers-green']}>{totalAnswers}</h4>
              )}
              <h4> / {totalQuestions}</h4>
              <h4> ( {calculatePercentage()}% correct answers rate )</h4>
            </div>
          </div>
        ) : (
          <div className={styles['course-no-yet']}>
            <Icon icon="browser" size={15}></Icon>
            <h5>Este curso no tiene métricas aun</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizCard;
