import { buildCourseDetails } from '@ltpx-frontend-apps/api';
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
import { useState } from 'react';
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
      text: 'Descripción general',
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
              <div className={styles['avatar']} >
              <Avatar
                image={courseDetails.instructor.image}
                size={AvatarSize.medium}
                outline={true}
              />
              </div>
              <div className={styles['items']} >
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
            </div>
            <div className={styles['summary-course']}>
              {/* <Tabs
                tabs={tabs}
                isNav={false}
                onClickTab={(option) => handleClick(option)}
              /> */}
              {/* {selectedTab === 0 && <OverviewCourse />} */}
              {/* {selectedTab === 1 && (
                <CourseContents contents={courseDetails.contents} />
              )}
              {selectedTab === 2 && (
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
              )} */}
              {/* {selectedTab === 3 && (
                <>
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
                  <ReviewForm />
                </>
              )} */}
            </div>
          </div>
        </div>
        {/* <BuyCourseCard
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
        /> */}
      </div>
    </div>
  );
}

export default CourseDetails;
