import type { ComponentMeta } from '@storybook/react';
import { FilesUploaded, TypeFile } from './files-uploaded';

const Story: ComponentMeta<typeof FilesUploaded> = {
  component: FilesUploaded,
  title: 'FilesUploaded',
};

export default Story;

export const Files = () => {
  return (
    <div>
      <FilesUploaded textFile={'imagen subida'} type={TypeFile.image} />
      <br/>
      <FilesUploaded textFile={'pdf subido'} type={TypeFile.pdf} />
      <br/>
      <FilesUploaded textFile={'video subido'} type={TypeFile.video} />
    </div>
  );
};

