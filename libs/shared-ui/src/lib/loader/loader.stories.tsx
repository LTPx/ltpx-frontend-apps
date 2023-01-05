import type { ComponentMeta } from '@storybook/react';
import { Loader, LoaderType } from './loader';

const Story: ComponentMeta<typeof Loader> = {
  component: Loader,
  title: 'Loader',
};

export default Story;

export const Default = () => {
  return (
    <div style={{ backgroundColor: '#d4d4d4', padding: '2rem' }}>
      <Loader></Loader>
      <br />
      <br />
      <Loader typeLoader={LoaderType.switch}></Loader>
    </div>
  );
};
