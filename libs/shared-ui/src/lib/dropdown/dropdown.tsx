import { useEffect, useRef } from 'react';
import styles from './dropdown.module.scss';

/* eslint-disable-next-line */
export interface DropdownProps {
  children: any;
}

export function Dropdown(props: DropdownProps) {
  const mainElement = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);
  const { children } = props;

  useEffect(() => {
    if (mainElement.current?.offsetWidth) {
      setPosition();
    }
    return () => {
    }
  }, [mainElement])

  const setPosition = () => {
    const width = mainElement?.current?.offsetWidth || 0;
    const widthContent = content?.current?.offsetWidth || 0;
    if (content.current) {
      content.current.style.left = `-${widthContent - width}px`;
    }
  }

  return (
    <div className={styles['container']}>
      <div className={styles['main-element']} ref={mainElement}>
        {children[0]}
      </div>
      <div className={styles['content']} ref={content}>
        {children[1]}
      </div>
    </div>
  );
}

export default Dropdown;
