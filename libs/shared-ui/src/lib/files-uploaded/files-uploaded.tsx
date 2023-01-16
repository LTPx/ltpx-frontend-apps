import { useRef, useState } from 'react';
import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import styles from './files-uploaded.module.scss';

/* eslint-disable-next-line */
export enum TypeFile {
  video = 'video',
  image = 'image',
  pdf = 'pdf',
}

export interface FilesUploadedProps {
  type: TypeFile;
  onChange: (file: any) => void;
  name?: string;
  className?: string;
  canRemove?: boolean;
}

export function FilesUploaded(props: FilesUploadedProps) {
  const { type, onChange, name, className, canRemove } = props;
  const [fileName, setFileName] = useState('');
  const elementRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: any) => {
    const files = e.target.files;
    if (files.length) {
      setFileName(files[0].name);
      onChange(files[0]);
    }
  };
  const handleClick = () => {
    elementRef.current?.click();
  };

  return (
    <div className={`${styles['container']} ${className}`}>
      <div className={styles['files-content']}>
        <div className={styles['file']}>
          {type === TypeFile.image && (
            <>
              <Icon icon={'image-outline'} size={45}></Icon>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpeg"
                ref={elementRef}
                name={name}
                onChange={handleChange}
              />
            </>
          )}
          {type === TypeFile.video && (
            <Icon icon={'videocam-outline'} size={45}></Icon>
          )}
          {type === TypeFile.pdf && (
            <>
              <Icon icon={'file-pdf'} size={45}></Icon>
              <input
                type="file"
                accept="application/pdf"
                ref={elementRef}
                name={name}
                onChange={handleChange}
              />
            </>
          )}
          {fileName ? (
            <h4>{fileName}</h4>
          ) : (
            <h4 className={styles['send-file']} onClick={handleClick}>
              Seleccionar archivo
            </h4>
          )}
        </div>
        <div className={styles['buttons']}>
          {fileName && (
            <>
              <Button
                className={styles['btn']}
                title={'Editar'}
                color={ColorsButton.primary}
                onClick={handleClick}
                outline={true}
              />
              {canRemove === true && (
                <Button
                  className={styles['btn']}
                  title={'Eliminar'}
                  color={ColorsButton.accent}
                  outline={true}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilesUploaded;
