import { Chat, Icon } from '@ltpx-frontend-apps/shared-ui';
import { useChat } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import styles from './chat-float.module.scss';

/* eslint-disable-next-line */
export interface ChatFloatProps {}

export function ChatFloat(props: ChatFloatProps) {
  const { showChat, setShowChat } = useChat();

  const ChatFloat = ({ onClick }: { onClick: () => void }) => (
    <div className={styles['chat-tab-button']} onClick={onClick}>
      <Icon icon="chat-dots" size={20} />
    </div>
  )

  return (
    <div className={styles['chat-float-container']}>
    {showChat ? (
      <div className={styles['chat-container']}>
        <Chat onCancel={() => setShowChat(false)} />
      </div>
    ) : (
      <ChatFloat onClick={() => setShowChat(true)} />
    )}
  </div>
  );
}

export default ChatFloat;
