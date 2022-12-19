import { buildCourses, Course } from '@ltpx-frontend-apps/api';
import {
  Avatar,
  AvatarSize,
  Button,
  ColorsButton,
  Rating,
  Tabs,
  Icon,
  BuyCourseCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useParams } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import styles from './course-details.module.scss';

/* eslint-disable-next-line */
export interface CourseDetailsProps {}

export function CourseDetails(props: CourseDetailsProps) {
  const { courseId } = useParams();
  const { addCourseToCart } = useUser();
  const course: Course = buildCourses(1)[0];
  const addToCart = () => {
    addCourseToCart(course);
  };

  const tabs = [
    {
      text: 'Overview',
    },
    {
      text: 'Curriculum',
    },
    {
      text: 'Instructor',
    },
    {
      text: 'Reviews',
    },
  ];

  return (
    <div className={styles['container']}>
      <div className={styles['course-details']}>
        <div className={styles['description-container']}>
          <div className={styles['description']}>
            <div className={styles['description-title']}>
              <h1>Learn Blockchain: Basic concepts and How to invest</h1>
              <h4 className="muted">
                Looking how to increase your incomes and learn about new digital
                money
              </h4>
            </div>
            <div className={styles['description-course']}>
              <Avatar
                image="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                size={AvatarSize.medium}
                outline={true}
              />
              <div className={styles['item']}>
                <label htmlFor="creator">Instructor</label>
                <h5>Michelle Wood</h5>
              </div>
              <div className={styles['item']}>
                <label htmlFor="creator">Categories</label>
                <h5>Blockchain</h5>
              </div>
              <div className={styles['item']}>
                <label htmlFor="creator">Review</label>
                <div className={styles['rating']}>
                  <Rating stars={4} reviewers={456} />
                </div>
              </div>
            </div>
            <div className={styles['summary-course']}>
              <Tabs tabs={tabs} isNav={false} />
              <div className={styles['overview']}>
                <section className={`${styles['course-description']}`}>
                  <h3>Course Description</h3>
                  <p>
                    This effective guide will help you understand blockchain and
                    Bitcoin, including more advanced topics such as smart
                    contracts and digital tokens, and will set you well on your
                    way to blockchain and Bitcoin mastery.
                  </p>
                </section>
                <section className={`${styles['achievements']}`}>
                  <h3>What you will Learn</h3>
                  <div className={styles['items']}>
                    <div className={styles['item']}>
                      <Icon icon={'check-circle'} size={15} />
                      <h5>You will able to create a btc wallet</h5>
                    </div>
                    <div className={styles['item']}>
                      <Icon icon={'check-circle'} size={15} />
                      <h5>Send and withdraw btc</h5>
                    </div>
                    <div className={styles['item']}>
                      <Icon icon={'check-circle'} size={15} />
                      <h5>Open account in binance exchange</h5>
                    </div>
                  </div>
                </section>
                <section className="requirements">
                  <h3>Requirements</h3>
                  <ul>
                    <li>
                      You don't need any previous experience or skills to take
                      this course
                    </li>
                    <li>A computer with good internet</li>
                    <li>
                      Credit or debit card to buy a small amount money to buy
                      btc
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
        <BuyCourseCard
          price={course.price || 10000}
          discount={20}
          achievements={course.duration || 12}
          lectures={course.lessons || 10}
          enrolled={10}
          language={'English'}
          skillLevel={'Beginner'}
          certificate={false}
        ></BuyCourseCard>
      </div>
    </div>
  );
}

export default CourseDetails;
