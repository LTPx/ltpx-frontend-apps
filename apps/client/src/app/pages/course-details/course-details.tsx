import { Avatar, AvatarSize, Button, ColorsButton, Rating } from '@ltpx-frontend-apps/shared-ui';
import Icon from 'libs/shared-ui/src/lib/icon/icon';
import { useParams } from 'react-router-dom';
import styles from './course-details.module.scss';

/* eslint-disable-next-line */
export interface CourseDetailsProps {
  id: string
}

export function CourseDetails(props: CourseDetailsProps) {
  const { courseId } = useParams();

  return (
    <div className={styles['container']}>
      <div className={styles['course-details']}>
        <div className={styles['description-container']}>
          <div className={styles['description']}>
            <div className={styles['description-title']}>
              <h1>Learn Blockchain: Basic concepts and How to invest</h1>
              <h4 className='muted'>
                Looking how to increase your incomes and learn about new digital money
              </h4>
            </div>
            <div className={styles['description-course']}>
              <Avatar
                image='https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                size={AvatarSize.medium}
                outline={true}
              />
              <div className={styles['item']}>
                <label htmlFor="creator">Instructor</label>
                <h5>Michelle Wood</h5>
              </div>
              <div className={styles['item']}>
                <label htmlFor="creator">Categories</label>
                <h5>Blockchain</h5>
              </div>
              <div className={styles['item']}>
                <label htmlFor="creator">Review</label>
                <div className={styles['rating']}>
                  <Rating stars={4} reviewers={456}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles['buy-card']} card`}>
          <img src="https://magazine.startus.cc/wp-content/uploads/2018/07/bitcoin-2643159_1920-e1533112613226.jpg" alt="" />
          <div className={`${styles['summary']}`}>
            <div className={styles['price-promo']}>
              <div className={styles['price']}>
                <h3>$39.99</h3>
              </div>
              <div className={styles['discount']}>
                <span>20% off</span>
              </div>
            </div>
            <div className={styles['actions']}>
              <Button title='BUY NOW' color={ColorsButton.primary} full={true}/>
              <Button title='ENROLL' color={ColorsButton.secondary} full={true}/>
            </div>
            <div className={styles['details']}>
              <div className={styles['item']}>
                <div className={styles['item-text']}>
                  <Icon icon={'clock'} size={15} color='#888888'></Icon>
                  <h4>Duration</h4>
                </div>
                <h4>5 weeks</h4>
              </div>
              <div className={styles['item']}>
                <div className={styles['item-text']} >
                  <Icon icon={'copy'} size={15} color='#888888'></Icon>
                  <h4>Lectures</h4>
                </div>
                <h4>32</h4>
              </div>
              <div className={styles['item']}>
                <div className={styles['item-text']}>
                  <Icon icon={'user'} size={15} color='#888888'></Icon>
                  <h4>Enrolled</h4>
                </div>
                <h4>12 Students</h4>
              </div>
              <div className={styles['item']}>
                <div className={styles['item-text']}>
                  <Icon icon={'text-size'} size={15} color='#888888'></Icon>
                  <h4>Language</h4>
                </div>
                <h4>English</h4>
              </div>
              <div className={styles['item']}>
                <div className={styles['item-text']}>
                  <Icon icon={'sliders'} size={15} color='#888888'></Icon>
                  <h4>Skill Level</h4>
                </div>
                <h4>Beginner</h4>
              </div>
              <div className={styles['item']}>
                <div className={styles['item-text']}>
                  <Icon icon={'file'} size={15} color='#888888'></Icon>
                  <h4>Certificate</h4>
                </div>
                <h4>Yes</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
