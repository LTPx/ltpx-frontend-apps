import { useRef, useState } from 'react';
import Icon from '../icon/icon';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import styles from './file-upload.module.scss';

/* eslint-disable-next-line */
export interface FileUploadProps {
  onChange: (file: any) => void;
  name?: string;
  image?: string;
  errorMessage?: string | null;
}

export function FileUpload(props: FileUploadProps) {
  const { name, onChange, image, errorMessage } = props;
  const [file, setFile] = useState(image || '');
  const elementRef = useRef<HTMLInputElement | null>(null);
  const handleChange = (e: any) => {
    console.log(e.target.files);
    const { target } = e;
    if (target.files.length) {
      setFile(URL.createObjectURL(e.target.files[0]));
      onChange(e.target.files[0]);
    }
  };
  const handleClick = () => {
    elementRef.current?.click();
  };

  return (
    <>
      <div className={styles['container']}>
        <img src={file} />
        <div
          className={`${styles['actions']} ${
            file ? styles['file-selected'] : ''
          }`}
        >
          <Icon icon={'cloud-upload-outline'} size={50}></Icon>
          {/* <h3>Subir Archivo</h3> */}
          {file ? (
            <h4 className={styles['upload-files']} onClick={handleClick}>
              Cambiar Portada
            </h4>
          ) : (
            <h4 className={styles['upload-files']} onClick={handleClick}>
              Seleccionar Portada
            </h4>
          )}
          {/* <h4>Se debe seleccionar archivos de tipo imagen o video</h4> */}
        </div>
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpeg"
          ref={elementRef}
          onChange={handleChange}
          name={name}
        />
      </div>
      {errorMessage && (
        <div className={styles['message-content']}>
          <InputTextStatus
            className={styles['message-error']}
            status={StatusInputText.error}
            text={errorMessage}
          />
        </div>
      )}
    </>
  );
}

export default FileUpload;
