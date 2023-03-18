import { generateConversation } from '@ltpx-frontend-apps/api';
import { ChatMessages } from '@ltpx-frontend-apps/shared-ui';
import styles from './live-class.module.scss';

/* eslint-disable-next-line */
export interface LiveClassProps {}

const conversation = generateConversation(10);

export function LiveClass(props: LiveClassProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['live-meeting']}>
        <div className={styles['video-container']}>
          <img src="https://media.giphy.com/media/l0HlTqHZV2XPshYis/giphy.gif" alt="" />
        </div>
      </div>
      <div className={styles['live-chat']}>
        <div className={styles['live-chat-content']}>
          <h3>Chat Group</h3>
          <label className='muted'>Please be respectful</label>
          {/* <ChatMessages messages={conversation} userId={'13'}/> */}
        </div>
      </div>
    </div>
  );
}

export default LiveClass;
