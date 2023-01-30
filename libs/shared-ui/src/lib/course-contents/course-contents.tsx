import PanelAccordion from '../panel-accordion/panel-accordion';
import styles from './course-contents.module.scss';

/* eslint-disable-next-line */
export interface CourseContent{
  title : string;
  description: string;
}

export interface CourseContentsProps {
  contents : CourseContent[];
}

export function CourseContents(props: CourseContentsProps) {
  const { contents } = props;
  return (
    <div className={styles['container']}>
      <h3>Contenidos del Curso</h3>
      {contents.map((content, index) =>(
        <PanelAccordion title={content.title} key={index}>
          <div className={styles['content']}>
            {content.description}
          </div>
        </PanelAccordion>  
      ))}
    </div>
  );
}

export default CourseContents;
