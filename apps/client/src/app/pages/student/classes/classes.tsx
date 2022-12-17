import { buildClasses } from '@ltpx-frontend-apps/api';
import { Button, ClassCard, ClassStatus, ColorsButton } from '@ltpx-frontend-apps/shared-ui';
import styles from './classes.module.scss';

/* eslint-disable-next-line */
export interface ClassesProps {}

const classes = buildClasses(4);

export function Classes(props: ClassesProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['classes-container']}>
        { classes.map((classUser, index)=>(
          <ClassCard
            key={index}
            title={classUser.title}
            teacher={{
              name: classUser.teacher.name,
              image: classUser.teacher.image,
            }}
            status={ClassStatus.live}
            startTime={classUser.startTime}
            duration={classUser.duration}
          >
            <div className={styles['actions']}>
              <Button
                className={styles['btn']}
                title='Skip Class'
                color={ColorsButton.white}
                outline={true}
                full={true}
              />
              <Button
                className={styles['btn']}
                title='Join Now'
                color={ColorsButton.primary}
                full={true}
                link={`/student/classes/${classUser.id}`}
              />
            </div>
          </ClassCard>
        ))}
      </div>
    </div>
  );
}

export default Classes;
