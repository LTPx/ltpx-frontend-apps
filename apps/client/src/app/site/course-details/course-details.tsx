import styles from './course-details.module.scss';
import { IRegisterUser } from '@ltpx-frontend-apps/api';
import {
  Avatar,
  AvatarSize,
  Rating,
  Tabs,
  BuyCourseCard,
  OverviewCourse,
  CourseContents,
  RegisterForm,
  SnackbarType,
  Snackbar,
  SnackbarPosition,
  CourseDateCard,
  Button,
  ColorsButton,
  Tag,
  ColorsTag,
  useMoment,
  AchievementBadge,
  SectionInformation,
} from '@ltpx-frontend-apps/shared-ui';
import { Dialog } from 'evergreen-ui';
import { useChat, useSite, useUser } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useCourseUtil } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import CheckoutForm from '../../components/checkout-form/checkout-form';

type MessageCheckout = {
  text: string;
  kind: SnackbarType;
};

export function CourseDetails() {
  const [openModal, setOpenModal] = useState(false);
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const { slug } = useParams();
  const { isAuthenticated, register } = useUser();
  const { translateLanguage, translateLevel, translateCategory } =
    useCourseUtil();
  const { t } = useTranslation();
  const { _getSiteCourse, currentFullCourse } = useSite();
  const { course, teacher, session } = currentFullCourse;
  const [message, setMessage] = useState<MessageCheckout>();
  const { customFormatDate, moment } = useMoment();
  const {
    _newChatRoom,
    setShowChat,
  } = useChat();


  const fetchCourse = useCallback(async () => {
    const { success, data, error } = await _getSiteCourse(slug || '');
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  const onSubmitForm = async (formData: IRegisterUser) => {
    const { success, error } = await register(formData);
    if (success) {
      window.location.reload();
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  const enrolled = () => {
    if (currentFullCourse && isAuthenticated) {
      setOpenEnrollModal(true);
    } else {
      setOpenModal(true);
    }
  };

  const chatWithTeacher = async () => {
    if (isAuthenticated) {
      await _newChatRoom(teacher.user_id)
      setShowChat(true);
    } else {
      setOpenModal(true);
    }
  };

  const tabs = [
    {
      text: 'Información',
    },
    {
      text: 'Contenidos',
    },
    {
      text: 'Logros',
    },
    // {
    //   text: 'Reseñas',
    // },
  ];

  if (course.id === undefined) {
    return <h1>loading..</h1>;
  }

  return (
    <div className={styles['container']}>
      <section className={styles['course-section']}>
        <div className={styles['head-responsive']}>
          <div className={styles['wrap-responsive']}>
            <img
              className={styles['image-responsive']}
              src={course.cover_url}
            />
            <div className={styles['content-responsive']}>
              <div className={styles['title-content-responsive']}>
                <h3 className={styles['title-responsive']}>{course.title}</h3>
                <div className={styles['price-content']}>
                  <h2 className={styles['price']}>$ {course.price}</h2>
                </div>
              </div>
              <h4 className={styles['teacher']}>Profesor: {teacher.name}</h4>
              <div className={styles['description-responsive']}>
                <Rating
                  className={styles['rating-responsive']}
                  stars={course.average_rating || 4}
                />
                <Tag
                  color={ColorsTag.green}
                  text={translateCategory(course.category)}
                />
              </div>
              <div className={styles['tag-responsive']}>
                <Tag
                  color={ColorsTag.white}
                  text={'Logros: ' + course.achievements?.length || '0'}
                  icon={'trophy'}
                />
                <Tag
                  color={ColorsTag.white}
                  text={'Contenidos: ' + course.contents.length}
                  icon={'copy'}
                />
                <Tag
                  color={ColorsTag.white}
                  text={'Inscritos: ' + session.enrollments_count}
                  icon={'person'}
                />
                <Tag
                  color={ColorsTag.white}
                  text={'Idioma: ' + translateLanguage(course.language)}
                  icon={'text-size'}
                />
                <Tag
                  color={ColorsTag.white}
                  text={'Nivel: ' + translateLevel(course.level)}
                  icon={'level'}
                />
                <Tag
                  color={ColorsTag.white}
                  text={'Certificado: Si'}
                  icon={'certificate'}
                />
              </div>
              <div className={styles['price-vertical-responsive']}>
                <div>
                  <Button
                    color={ColorsButton.secondary}
                    onClick={() => setOpenModal(true)}
                    title={'INSCRIBIRME AHORA'}
                    full={true}
                  />
                </div>
                <div>
                  <Button
                    onClick={chatWithTeacher}
                    icon="chat"
                    title="Tengo una pregunta"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['course-details']}>
          <div className={styles['description-container']}>
            <div className={styles['description']}>
              <div className={styles['description-title']}>
                <div className={styles['title']}>
                  <h1 className={styles['title-course']}>{course.title}</h1>
                </div>
              </div>
              <div className={styles['description-course']}>
                <div className={styles['avatar']}>
                  <NavLink to={`/teacher/${teacher.slug}`}>
                    <Avatar
                      image={teacher.profile_image || ''}
                      size={AvatarSize.medium}
                      outline={true}
                    />
                  </NavLink>
                </div>
                <div className={styles['items']}>
                  <div className={styles['item']}>
                    <label>
                      {t('coursesDetails.teacherInformation.instructor')}
                    </label>
                    <NavLink to={`/teacher/${teacher.slug}`}>
                      <h5>{teacher.name}</h5>
                    </NavLink>
                  </div>
                  <div className={styles['item']}>
                    <label>
                      {t('coursesDetails.teacherInformation.categories')}
                    </label>
                    <h5>{translateCategory(course.category)}</h5>
                  </div>
                  <div className={styles['item']}>
                    <label>
                      {t('coursesDetails.teacherInformation.review')}
                    </label>
                    <div className={styles['rating']}>
                      <Rating stars={course.average_rating || 0} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['summary-course']}>
                <Tabs
                  className={styles['tabs']}
                  classNameText={styles['tabs-edit']}
                  tabs={tabs}
                  isNav={false}
                  onClickTab={(option) => handleClick(option)}
                />
                <div className={styles['tabs-content']}>
                  {selectedTab === 0 && (
                    <OverviewCourse
                      description={course.description}
                      goals={
                        course.learn_goals ? course.learn_goals.split('\n') : []
                      }
                      requirements={
                        course.requirements
                          ? course.requirements.split('\n')
                          : []
                      }
                    />
                  )}
                  {selectedTab === 1 && (
                    <CourseContents contents={course.contents || []} />
                  )}
                  {selectedTab === 2 && (
                    <div className={styles['achievements']}>
                      {course.achievements?.map((achievement, index) => (
                        <AchievementBadge
                          key={index}
                          title={achievement.title}
                          image={achievement.image}
                        />
                      ))}
                    </div>
                  )}
                  {/* {selectedTab === 3 && (
                    <div className={styles['reviews-wrap']}>
                      <RatingCourse
                        ratings={currentFullCourse.ratings || []}
                      ></RatingCourse>
                      <div className={styles['comment-course']}>
                        {currentFullCourse.comments.map(
                          (comment, index) => (
                            <CommentCourse
                              reviewTitle={comment.title}
                              name={comment.name}
                              comment={comment.comment}
                              date={comment.date}
                              key={index}
                              image={comment.image}
                            />
                          )
                        )}
                      </div>
                      <ReviewForm />
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
          <div className={styles['buy-course-content']}>
            <BuyCourseCard
              price={course.price_format}
              totalAchievements={course.achievements?.length || 0}
              totalContents={course.contents.length}
              totalEnrolled={session.enrollments_count}
              language={translateLanguage(course.language)}
              skillLevel={translateLevel(course.level)}
              image={course.cover_url}
              onClickEnroll={enrolled}
              certificate={true}
            />
            <div className={styles['contact-teacher']}>
              <Button
                onClick={chatWithTeacher}
                icon="chat"
                full={true}
                title="Tengo una pregunta"
              />
            </div>
          </div>
        </div>
        <div className={styles['price-responsive']}>
          <h3 className={styles['price-text']}> $ {course.price}</h3>
          <Button
            color={ColorsButton.secondary}
            onClick={() => setOpenModal(true)}
            title="Comprar Ahora"
            full={true}
          />
        </div>
      </section>
      <section className={styles['schedules-section']}>
        <div className={styles['content']}>
          <h2 className={styles['title-date']}>Horarios de las clases</h2>
          <div className={styles['course-date']}>
            {session.meetings &&
              session.meetings.map((meeting, index) => (
                <CourseDateCard
                  key={index}
                  description={`Las clases tendrán una duración de ${session.call_time_min} min`}
                  title={`Clase ${index + 1}: ${customFormatDate(
                    meeting.start_date,
                    'MMM D YYYY'
                  )}`}
                  time={`Hora de inicio: ${customFormatDate(
                    meeting.start_date,
                    'h:mm a'
                  )}`}
                />
              ))}
          </div>
        </div>
      </section>
      <SectionInformation
        className={styles['section-content']}
        title={'¿Estos horarios no se ajustan a ti?'}
        imgUrl={'../../../../assets/images/bg_shape.svg'}
      >
        <div className={styles['btn']}>
          <Button
            title={'Solicitar otro horario'}
            onClick={chatWithTeacher}
          />
        </div>
      </SectionInformation>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title="Regístrate y aprende hoy mismo"
        onCloseComplete={() => setOpenModal(false)}
      >
        <div className={styles['register-modal']}>
          <RegisterForm
            onSubmit={(data) => {
              onSubmitForm(data);
            }}
          />
        </div>
      </Dialog>
      {openEnrollModal && (
        <CheckoutForm
          open={openEnrollModal}
          onClose={() => {
            setOpenEnrollModal(false);
          }}
          product={{
            description: course.title,
            price: parseFloat(course.price),
            id: session.id,
            image: course.cover_url,
          }}
          onSuccess={() => {
            setOpenEnrollModal(false);
            setMessage({
              text: `Gracias por tu compra`,
              kind: SnackbarType.success,
            });
          }}
          onError={() => {
            setOpenEnrollModal(false);
            setMessage({
              text: `Ha ocurrido un error intenta mas tarde`,
              kind: SnackbarType.error,
            });
          }}
        />
      )}
      {message && (
        <Snackbar
          open={true}
          position={SnackbarPosition.centerBottom}
          title={message.text}
          kind={message.kind}
          onClose={() => setMessage(undefined)}
          duration={2000}
        />
      )}
    </div>
  );
}

export default CourseDetails;

