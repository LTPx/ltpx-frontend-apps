import {
  buildCourseDetails,
  CourseModel,
  FullCourse,
} from '@ltpx-frontend-apps/api';
import {
  Avatar,
  AvatarSize,
  Rating,
  Tabs,
  BuyCourseCard,
  TeacherOverview,
  RatingCourse,
  CommentCourse,
  ReviewForm,
  OverviewCourse,
  CourseContents,
} from '@ltpx-frontend-apps/shared-ui';
import { useSite } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../../store';
import styles from './course-details.module.scss';

/* eslint-disable-next-line */
export interface CourseDetailsProps {}

export function CourseDetails(props: CourseDetailsProps) {
  const { courseId } = useParams();
  const { addCourseCart } = useUser();
  const courseDetails = buildCourseDetails();
  const [selectedTab, setSelectedTab] = useState(0);
  const [course, setCourse] = useState<FullCourse>();
  const { _getSiteCourse } = useSite();
  const id = parseInt(courseId || '');

  const fetchCourse = useCallback(async () => {
    const { success, data, error } = await _getSiteCourse(id);
    if (success) {
      setCourse(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  const addToCart = () => {
    // addCourseToCart(courseDetails.course);
    // addCourseCart(courseDetails.course);
  };

  const enrolled = () => {
    console.log('click enrolled');
  };

  const tabs = [
    {
      text: 'Descripción',
    },
    {
      text: 'Contenidos',
    },
    {
      text: 'Profesor',
    },
    {
      text: 'Reseñas',
    },
  ];

  return (
    <div className={styles['container']}>
      {course && (
        <div className={styles['course-details']}>
          <div className={styles['description-container']}>
            <div className={styles['description']}>
              <div className={styles['description-title']}>
                <div className={styles['title']}>
                  <h1>Learn Blockchain: Basic concepts and How to invest</h1>
                  <h4 className="muted">
                    Looking how to increase your incomes and learn about new
                    digital money
                  </h4>
                </div>
              </div>
              <div className={styles['description-course']}>
                <div className={styles['avatar']}>
                  <Avatar
                    image={course?.teacher.image || ''}
                    size={AvatarSize.medium}
                    outline={true}
                  />
                </div>
                <div className={styles['items']}>
                  <div className={styles['item']}>
                    <label htmlFor="creator">Instructor</label>
                    <h5>{course?.teacher?.fullname}</h5>
                  </div>
                  <div className={styles['item']}>
                    <label htmlFor="creator">Categories</label>
                    <h5>{course?.course.category}</h5>
                  </div>
                  <div className={styles['item']}>
                    <label htmlFor="creator">Review</label>
                    <div className={styles['rating']}>
                      <Rating stars={course?.course.average_rating || 0} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['summary-course']}>
                <Tabs
                  className={styles['tabs']}
                  tabs={tabs}
                  isNav={false}
                  onClickTab={(option) => handleClick(option)}
                />
                <div className={styles['tabs-content']}>
                  {selectedTab === 0 && (
                    <OverviewCourse
                      description={course?.course.description}
                      goals={course?.course.learn_goals.split('\n')}
                      requirements={course?.course.requirements.split('\n')}
                    />
                  )}
                  {selectedTab === 1 && (
                    <CourseContents contents={course?.course.contents || []} />
                  )}
                  {selectedTab === 2 && (
                    <TeacherOverview
                      name={course?.teacher.fullname || ''}
                      profession={course?.teacher.profession || ''}
                      rating={course?.teacher.rating_average || 0}
                      reviews={course?.teacher.rating_average}
                      students={course?.teacher.total_students}
                      courses={5}
                      biography={course?.teacher.biography}
                      image={course?.teacher.image}
                    />
                  )}
                  {selectedTab === 3 && (
                    <>
                      <RatingCourse
                        ratings={course.ratings || []}
                      ></RatingCourse>
                      <div className={styles['comment-course']}>
                        {course.comments.map((comment, index) => (
                          <CommentCourse
                            reviewTitle={comment.title}
                            name={comment.name}
                            comment={comment.comment}
                            date={comment.date}
                            key={index}
                            image={comment.image}
                          />
                        ))}
                      </div>
                      <ReviewForm />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <BuyCourseCard
            price={10}
            achievements={3}
            lectures={9}
            enrolled={13}
            language={course.course.language}
            skillLevel={course.course.level}
            certificate={true}
            image={course.course.cover_url}
            onClickBuy={addToCart}
            onClickEnroll={enrolled}
          />
        </div>
      )}
    </div>
  );
}

export default CourseDetails;
