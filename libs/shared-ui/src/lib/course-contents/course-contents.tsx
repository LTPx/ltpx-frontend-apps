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
      {contents.map((content, index) =>(
        <PanelAccordion title={content.title} key={index}>
          <pre className={styles['content']}>
            {content.description}
          </pre>
        </PanelAccordion>
      ))}
    </div>
  );
}

export default CourseContents;
