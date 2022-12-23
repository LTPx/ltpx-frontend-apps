import Button, { ColorsButton } from '../button/button';
import Input from '../input/input';
import Rating from '../rating/rating';
import TextArea from '../text-area/text-area';
import styles from './review-form.module.scss';

/* eslint-disable-next-line */
export interface ReviewFormProps {}

export function ReviewForm(props: ReviewFormProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['review']}>
        <div className={styles['review-form']}>
          <label className={styles['title']}>Add Review and Rate</label>
          <label>What is like to Course?</label>
          <Rating stars={4}></Rating>
        </div>
        <div className={styles['form']}>
          <div className={styles['input']}>
            <label>Review Title</label>
            <Input></Input>
          </div>
          <div className={styles['textArea']}>
            <label>Review Content</label>
            <TextArea rows={10} cols={62}></TextArea>
          </div>
          <Button className={styles['button']}
            title="SUBMIT REVIEW" 
            color={ColorsButton.primary}></Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
