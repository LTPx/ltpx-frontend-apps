import { useRef, useState } from 'react';
import styles from './file-upload.module.scss';

/* eslint-disable-next-line */
export interface FileUploadProps {
  text?: string
}

export function FileUpload(props: FileUploadProps) {
  const { text } = props;
  const [file, setFile] = useState('');
  const elementRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: any) => {
    console.log(e.target.files);
    const { target } =  e;
    if (target.files.length) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }
  const handleClick = () => {
    elementRef.current?.click();
  }

  return (
    <div className={styles['container']} onClick={handleClick}>
      <img src={file} />
      <div className={styles['actions']}>
        <h4>{text}</h4>
      </div>
      <div className={styles['backdrop']}></div>
      <input type="file" ref={elementRef} onChange={handleChange}/>
    </div>
  );
}

export default FileUpload;
