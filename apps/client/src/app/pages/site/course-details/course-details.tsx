import styles from './course-details.module.scss';
import { FullCourse, IRegisterUser } from '@ltpx-frontend-apps/api';
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
  RegisterForm,
} from '@ltpx-frontend-apps/shared-ui';
import { Dialog } from 'evergreen-ui';
import { useCart, useSite, useUser } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function CourseDetails() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [course, setCourse] = useState<FullCourse>();
  const { courseId } = useParams();
  const { isAuthenticated, register } = useUser();
  const { _addCourseCart } = useCart();
  const { _getSiteCourse } = useSite();
  const id = parseInt(courseId || '');
  const navigate = useNavigate();

  const fetchCourse = useCallback(async () => {
    const { success, data, error } = await _getSiteCourse(id);
    if (success) {
      setCourse(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  const onSubmitForm = async (formData: IRegisterUser) => {
    const { isLogin, data } = await register(formData);
    if (isLogin) {
      navigate('/cart');
      if (course) {
        _addCourseCart(course.course);
      }
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  const addToCart = () => {
    if (course && isAuthenticated) {
      _addCourseCart(course.course);
    } else {
      setOpenModal(true);
    }
  };

  const enrolled = () => {
    if (course && isAuthenticated) {
      _addCourseCart(course.course);
      navigate('/cart');
    } else {
      setOpenModal(true);
    }
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
                  <h1>{course.course.title}</h1>
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
            achievements={course.course.achievements?.length || 0}
            lectures={course.course.contents.length}
            enrolled={course.course.enrollments_count}
            language={course.course.language}
            skillLevel={course.course.level}
            image={course.course.cover_url}
            onClickBuy={addToCart}
            onClickEnroll={enrolled}
            certificate={true}
          />
        </div>
      )}
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title="Regístrate y aprende hoy mismo"
        onCloseComplete={() => setOpenModal(false)}
        width={'35vw'}
      >
        <div className={styles['register-modal']}>
          <RegisterForm
            onSubmit={(data) => {
              onSubmitForm(data);
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default CourseDetails;
