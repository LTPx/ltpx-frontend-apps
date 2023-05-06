import { useLocation } from 'react-router-dom';
import styles from './scroll-to-top.module.scss';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface ScrollToTopProps {}

export function ScrollToTop(props: ScrollToTopProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
