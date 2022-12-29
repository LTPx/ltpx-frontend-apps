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
          <h3>Add Review and Rate</h3>
          <h4>What is like to Course?</h4>
          <Rating stars={4}></Rating>
        </div>
        <div className={styles['form']}>
          <div className={styles['input']}>
            <h4>Review Title</h4>
            <Input></Input>
          </div>
          <div className={styles['textArea']}>
            <h4>Review Content</h4>
            <TextArea rows={10} cols={62}></TextArea>
          </div>
          <Button
            className={styles['button']}
            title="SUBMIT REVIEW"
            color={ColorsButton.primary}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
