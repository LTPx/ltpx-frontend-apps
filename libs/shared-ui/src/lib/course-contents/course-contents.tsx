import PanelAccordion from '../panel-accordion/panel-accordion';
import styles from './course-contents.module.scss';

/* eslint-disable-next-line */
export interface CourseContent{
  title : string;
  description: string;
}

export interface CourseContentsProps {
  contents : CourseContent[];
  lock?: boolean;
}

export function CourseContents(props: CourseContentsProps) {
  const { contents, lock } = props;
  return (
    <div className={styles['container']}>
      {contents.map((content, index) =>(
        <PanelAccordion lock={lock} title={content.title} key={index}>
          <pre className={styles['content']}>
            {content.description}
          </pre>
        </PanelAccordion>
      ))}
    </div>
  );
}

export default CourseContents;
