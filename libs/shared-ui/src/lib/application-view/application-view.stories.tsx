import type {ComponentMeta } from '@storybook/react';
import { ApplicationView } from './application-view';

const Story: ComponentMeta<typeof ApplicationView> = {
  component: ApplicationView,
  title: 'ApplicationView',
};

export default Story;

export const View = () => {
  return (
    <div className="content">
      <ApplicationView />
    </div>
  )
};