import { buildCourseDetails } from '@ltpx-frontend-apps/api';
import {
  Avatar,
  AvatarSize,
  Button,
  ColorsButton,
  Rating,
  Tabs,
  Icon,
  BuyCourseCard,
  TeacherOverview,
  RatingCourse,
  CommentCourse,
  ReviewForm,
} from '@ltpx-frontend-apps/shared-ui';
import { useParams } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import styles from './course-details.module.scss';

/* eslint-disable-next-line */
export interface CourseDetailsProps {}

export function CourseDetails(props: CourseDetailsProps) {
  const { courseId } = useParams();
  const { addCourseToCart } = useUser();
  const courseDetails = buildCourseDetails();

  const addToCart = () => {
    addCourseToCart(courseDetails.course);
  };

  const enrolled = () => {
    console.log('click enrolled');
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
                image={courseDetails.instructor.image}
                size={AvatarSize.medium}
                outline={true}
              />
              <div className={styles['item']}>
                <label htmlFor="creator">Instructor</label>
                <h5>{courseDetails.instructor.name}</h5>
              </div>
              <div className={styles['item']}>
                <label htmlFor="creator">Categories</label>
                <h5>{courseDetails.course.category}</h5>
              </div>
              <div className={styles['item']}>
                <label htmlFor="creator">Review</label>
                <div className={styles['rating']}>
                  <Rating stars={courseDetails.course.stars} />
                </div>
              </div>
            </div>
            <div className={styles['summary-course']}>
              <Tabs tabs={tabs} isNav={false} />
              <div className={styles['overview']}>
                <section className={`${styles['course-description']}`}>
                  <h3>Course Description</h3>
                  <p>{courseDetails.overview.description}</p>
                </section>
                <section className={`${styles['achievements']}`}>
                  <h3>What you will Learn</h3>
                  <div className={styles['items']}>
                    {courseDetails.overview.goals.map((goal, index) => (
                      <div className={styles['item']} key={index}>
                        <Icon icon={'check-circle'} size={12} />
                        <h5>{goal}</h5>
                      </div>
                    ))}
                  </div>
                </section>
                <section className={`${styles['requirements']}`}>
                  <h3>Requirements</h3>
                  {courseDetails.overview.requirements.map(
                    (requirement, index) => (
                      <ul key={index}>
                        <li>
                          <h5>{requirement}</h5>
                        </li>
                      </ul>
                    )
                  )}
                </section>
              </div>
              <TeacherOverview
                name={courseDetails.instructor.name}
                profession={courseDetails.instructor.profession}
                rating={courseDetails.instructor.stars}
                reviews={courseDetails.instructor.reviews}
                students={courseDetails.instructor.students}
                courses={courseDetails.instructor.courses}
                biography={courseDetails.instructor.biography}
                image={courseDetails.instructor.image}
              />
              <RatingCourse ratings={courseDetails.ratings}></RatingCourse>
              {courseDetails.comments.map((comment, index) => (
                <CommentCourse
                  reviewTitle={comment.title}
                  name={comment.name}
                  comment={comment.comment}
                  date={comment.date}
                  key={index}
                  image={comment.image}
                />
              ))}
              <ReviewForm></ReviewForm>
            </div>
          </div>
        </div>
        <BuyCourseCard
          price={courseDetails.course.price}
          discount={courseDetails.course.discount}
          achievements={courseDetails.course.achievements}
          lectures={courseDetails.course.lessons}
          enrolled={courseDetails.course.enrolled}
          language={courseDetails.course.language}
          skillLevel={courseDetails.course.skillLevel}
          certificate={courseDetails.course.certificate}
          image={courseDetails.course.image}
          onClickBuy={addToCart}
          onClickEnroll={enrolled}
        />
      </div>
    </div>
  );
}

export default CourseDetails;
