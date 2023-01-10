import { useRef, useState } from 'react';
import Icon from '../icon/icon';
import styles from './file-upload.module.scss';

/* eslint-disable-next-line */
export interface FileUploadProps {}

export function FileUpload(props: FileUploadProps) {
  const [file, setFile] = useState('');
  const elementRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: any) => {
    console.log(e.target.files);
    const { target } = e;
    if (target.files.length) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleClick = () => {
    elementRef.current?.click();
  };

  return (
    <div className={styles['container']}>
      <img src={file} />
      <div
        className={`${styles['actions']} ${
          file ? styles['file-selected'] : ''
        }`}
      >
        <Icon icon={'cloud-upload-outline'} size={80}></Icon>
        <h3>Elegir Archivo</h3>
        <h4>Se debe seleccionar archivos de tipo imagen o video</h4>
        {file ? (
          <h4 className={styles['upload-files']} onClick={handleClick}>
            Cambiar Archivo
          </h4>
        ) : (
          <h4 className={styles['upload-files']} onClick={handleClick}>
            Seleccionar Archivo
          </h4>
        )}
      </div>
      <input accept="image/png,image/jpeg,image/jpeg" type="file" ref={elementRef} onChange={handleChange} />
    </div>
  );
}

export default FileUpload;
