import { useTranslation } from 'react-i18next';
import Button, { ColorsButton } from '../button/button';
import Input from '../input/input';
import Rating from '../rating/rating';
import TextArea from '../text-area/text-area';
import styles from './review-form.module.scss';

/* eslint-disable-next-line */
export interface ReviewFormProps {}

export function ReviewForm(props: ReviewFormProps) {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <div className={styles['review']}>
        <div className={styles['review-form']}>
          <h3>{t('coursesDetails.reviewForm.title')}</h3>
          <h4>{t('coursesDetails.reviewForm.subtitle')}</h4>
          <Rating stars={4}></Rating>
        </div>
        <div className={styles['form']}>
          <div className={styles['input']}>
            <h4>{t('coursesDetails.reviewForm.reviewTitle')}</h4>
            <Input></Input>
          </div>
          <div className={styles['textArea']}>
            <h4>{t('coursesDetails.reviewForm.reviewContent')}</h4>
            <TextArea rows={10} ></TextArea>
          </div>
          <Button
            className={styles['button']}
            title={t('coursesDetails.reviewForm.sendButton')}
            color={ColorsButton.primary}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
