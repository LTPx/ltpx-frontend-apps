import type { ComponentMeta } from '@storybook/react';
import { FileUpload } from './file-upload';

const Story: ComponentMeta<typeof FileUpload> = {
  component: FileUpload,
  title: 'FileUpload',
};

export default Story;

export const Files = () => {
  return (
    <div>
      <FileUpload text='Subir archivo'/>
    </div>
  );
};