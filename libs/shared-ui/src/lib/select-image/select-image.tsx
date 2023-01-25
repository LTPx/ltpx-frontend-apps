import { useState } from 'react';
import styles from './select-image.module.scss';

/* eslint-disable-next-line */
export interface Image {
  img : string;
}

export interface SelectImageProps {
  onChange?: (img: string) => void;
  images : Array<Image>;
}

export function SelectImage(props: SelectImageProps) {
  const { images, onChange } = props;
  const [indexSelected, setIndexSelected] = useState(-1);

  return (
    <div className={styles['container']}>
      <div className={styles['img']}>
        {images.map((element, index) => (
          <div
            className={
              indexSelected === index
                ? `${styles['image-selected']}`
                : `${styles['image']}`
            }
            key={index}
          >
            <img
              src={element.img}
              alt=""
              onClick={()=>{
                setIndexSelected(index);
                onChange && onChange(element.img);
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
