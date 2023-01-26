import { useState } from 'react';
import styles from './select-image.module.scss';

/* eslint-disable-next-line */

export interface SelectImageProps {
  onChange?: (img: string) => void;
  images : string[];
}

export function SelectImage(props: SelectImageProps) {
  const { images, onChange } = props;
  const [indexSelected, setIndexSelected] = useState(-1);

  return (
    <div className={styles['container']}>
      <div className={styles['img']}>
        {images.map((img, index) => (
          <div
            className={
              indexSelected === index
                ? `${styles['image-selected']}`
                : `${styles['image']}`
            }
            key={index}
          >
            <img
              src={img}
              alt=""
              onClick={()=>{
                setIndexSelected(index);
                onChange && onChange(img);
              }}
              key={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectImage;
