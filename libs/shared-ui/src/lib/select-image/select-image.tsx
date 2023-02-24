import { useState } from 'react';
import styles from './select-image.module.scss';

/* eslint-disable-next-line */

export interface SelectImageProps {
  images: string[];
  selected?: string;
  onChange?: (img: string) => void;
}

export function SelectImage(props: SelectImageProps) {
  const { images, onChange, selected } = props;
  const [indexSelected, setIndexSelected] = useState(-1);

  return (
    <div className={styles['container']}>
      <div className={styles['images']}>
        {images.map((img, index) => (
          <div
            className={
              (indexSelected === index || selected === img)
                ? `${styles['image']} ${styles['image-selected']}`
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
