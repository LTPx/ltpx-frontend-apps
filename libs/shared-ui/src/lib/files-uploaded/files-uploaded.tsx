import { useRef, useState } from 'react';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Icon from '../icon/icon';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import styles from './files-uploaded.module.scss';

/* eslint-disable-next-line */
export enum TypeFile {
  image = 'image',
  pdf = 'pdf',
  video = 'video',
}

export interface FilesUploadedProps {
  type: TypeFile;
  name?: string;
  label?: string;
  description?: any;
  className?: string;
  canRemove?: boolean;
  multiple?: boolean;
  errorMessage?: string | null;
  onChange: (file: any) => void;
}

export function FilesUploaded(props: FilesUploadedProps) {
  const {
    type,
    onChange,
    name,
    className,
    canRemove,
    multiple,
    label,
    errorMessage,
    description
  } = props;
  const [fileName, setFileName] = useState('');
  const elementRef = useRef<HTMLInputElement | null>(null);

  const filesTypes = {
    image: 'image/png, image/jpeg',
    pdf: 'application/pdf',
    video: 'video/*'
  };

  const filesIcons = {
    image: 'image-outline',
    pdf: 'file-pdf',
    video: 'videocam-outline',
  };

  const handleChange = (e: any) => {
    const files = e.target.files;
    if (files.length > 0 && files.length === 1) {
      setFileName(files[0].name);
      onChange(files[0]);
    }
    if (files.length > 0 && files.length > 1) {
      const names = Array.from(files)
        .map((file: any) => file.name)
        .join(', ');
      setFileName(names);
      onChange(files);
    }
  };

  const handleClick = () => {
    elementRef.current?.click();
  };

  return (
    <div className={`${styles['container']} ${label ? styles['with-label'] : ''}`}>
      {label && <label>{label}</label>}
      {description && description}
      <div className={`${styles['content']} ${className}`}>
        <div className={styles['files-content']}>
          <div className={styles['file']}>
            <Icon icon={filesIcons[type]} size={45}></Icon>
            <input
              type="file"
              accept={filesTypes[type]}
              ref={elementRef}
              name={name}
              onChange={handleChange}
              multiple={multiple}
            />
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
                  type={TypeButton.button}
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
      {errorMessage && (
        <InputTextStatus status={StatusInputText.error} text={errorMessage} />
      )}
    </div>
  );
}

export default FilesUploaded;
