import styles from './loader.module.scss';

/* eslint-disable-next-line */
export enum LoaderType {
  default = 'default',
  switch = 'switch',
}
export interface LoaderProps {
  typeLoader?: LoaderType;
}

export function Loader(props: LoaderProps) {
  const { typeLoader } = props;

  const loaderClass = {
    default: styles['loader-default'],
    switch: styles['loader-switch'],
  };

  const loadersType = loaderClass[typeLoader || LoaderType.default];

  return (
    <div className={styles['container']}>
      <div className={`${styles['loaders']} ${loadersType}`}>
        <span></span>
      </div>
    </div>
  );
}

export default Loader;
