import {
  CourseModel,
  NewTaskParams,
  QuizModel,
  QuizParams,
  Student,
  TaskModel,
} from '@ltpx-frontend-apps/api';
import {
  Button,
  QuizBuilder,
  Tab,
  Tabs,
  TaskForm,
} from '@ltpx-frontend-apps/shared-ui';
import {
  useCourse,
  useCourseStudents,
  useUtil,
} from '@ltpx-frontend-apps/store';
import { Avatar, Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TeacherViewStudent from '../teacher-view-student/teacher-view-student';
import styles from './teacher-course-students.module.scss';

/* eslint-disable-next-line */
export interface TeacherCourseStudentsProps {}

export function TeacherCourseStudents(props: TeacherCourseStudentsProps) {
  const { _getStudentsByCourse } = useCourseStudents();
  const [loaded, setLoaded] = useState(false);
  const [idStudent, setIdStudent] = useState<number>();
  const [optionsTab, setOptionsTab] = useState<Tab[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [course, setCourse] = useState<CourseModel>();
  const { courseId } = useParams();
  const [quizEdit, setQuizEdit] = useState<QuizModel>();
  const [showForm, setShowForm] = useState(false);
  const { setMessageToast } = useUtil();
  const [task, setTask] = useState<TaskModel>();
  const [openModal, setOpenModal] = useState(false);
  const { _addTask, _updateTask, _removeTask, _updateQuiz, _addQuiz } =
    useCourse();

  const id = parseInt(courseId || '');

  async function handleSaveTask(params: NewTaskParams) {
    const { data, success, error } = await _addTask(
      course ? course.id : 0,
      params
    );
    if (success) {
      setMessageToast('success', 'Tus cambios han sido guardados');
    } else {
      setMessageToast('error', `${error || 'Ha ocurrido un error'}`);
    }
    if (success) {
      setTask(data);
    } else {
      console.log(error);
    }
  }

  const handleSaveQuiz = async (quiz: QuizParams) => {
    const response = quiz.id
      ? await _updateQuiz({ ...quiz, ...{ id: quiz.id } })
      : await _addQuiz(quiz);
    const { success, error } = response;
    if (success) {
      setMessageToast('success', 'Tus cambios han sido guardados');
    } else {
      setMessageToast('error', `${error || 'Ha ocurrido un error'}`);
    }
    if (success) {
      // onSubmit(response);
      setShowForm(false);
      setQuizEdit(undefined);
    } else {
      console.log(response);
      // onSubmit(response);
    }
  };

  const fetchStudents = useCallback(async () => {
    const { success, data, error } = await _getStudentsByCourse(id);
    if (success) {
      const students = data.students;
      const course = data.course;
      const options = students.map((student: Student) => {
        return {
          text: student.name,
          children: <TabStudent name={student.name} />,
        };
      });
      setStudents(students);
      setCourse(course);
      setOptionsTab(options);
      setLoaded(true);
      console.log(idStudent);
    } else {
      setLoaded(true);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, []);

  const TabStudent = ({ name }: { name: string }) => (
    <div className={styles['tab-options']}>
      <Avatar name={name} size={30} />
      {name}
    </div>
  );

  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <h2 className={styles['title']}>Curso: {course ? course.title : ''}</h2>
        {/* <div className={styles['btn-actions']}>
          <Button
            className={styles['btn']}
            icon="plus"
            title="Agregar Tarea"
            onClick={() => setOpenModal(true)}
          />
          <Button
            className={styles['btn']}
            icon="pencil"
            title="Agregar Test"
            onClick={() => setShowForm(true)}
          />
        </div> */}
      </div>
      <Dialog
        isShown={showForm}
        hasFooter={false}
        title={'Agregar Test'}
        onCloseComplete={() => setShowForm(false)}
        width={'55vw'}
      >
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
          showFooter={true}
        />
        <div className={styles['button-content']}></div>
      </Dialog>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title={task?.id ? 'Editar Tarea' : 'Nueva Tarea'}
        onCloseComplete={() => setOpenModal(false)}
        width={'40vw'}
      >
        <TaskForm
          onClose={() => setOpenModal(false)}
          task={task}
          onSubmit={(params) => {
            if (task?.id) {
              // handleUpdateTask(params);
              setTask(undefined);
            } else {
              handleSaveTask(params);
            }
          }}
        />
      </Dialog>
      <div className={styles['content']}>
        <div className={styles['all-students']}>
          <div className={styles['all-students-header']}>
            <h3>Estudiantes</h3>
            <h3>{loaded ? students.length : 0}</h3>
          </div>
          {loaded && (
            <Tabs
              className={styles['tabs']}
              tabs={optionsTab}
              vertical={true}
              onClickTab={(index) => {
                setIdStudent(students[index].student_id);
              }}
            />
          )}
        </div>
        <div className={styles['information']}>
          {idStudent && <TeacherViewStudent studentId={idStudent} />}
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseStudents;
