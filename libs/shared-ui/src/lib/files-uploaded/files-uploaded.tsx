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
  textFile: string;
}

export function FilesUploaded(props: FilesUploadedProps) {
  const { type, textFile } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['files-content']}>
        <div className={styles['file']}>
          {type === TypeFile.image && (
            <Icon icon={'image-outline'} size={40}></Icon>
          )}
          {type === TypeFile.video && (
            <Icon icon={'videocam-outline'} size={40}></Icon>
          )}
          {type === TypeFile.pdf && <Icon icon={'file'} size={40}></Icon>}
          <h4>{textFile}</h4>
        </div>
        <Button
          title={'Eliminar'}
          color={ColorsButton.accent}
          outline={true}
        ></Button>
      </div>
    </div>
  );
}

export default FilesUploaded;
