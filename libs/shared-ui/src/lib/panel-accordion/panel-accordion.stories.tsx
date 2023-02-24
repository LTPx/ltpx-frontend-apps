import type { ComponentMeta } from '@storybook/react';
import { PanelAccordion } from './panel-accordion';

const Story: ComponentMeta<typeof PanelAccordion> = {
  component: PanelAccordion,
  title: 'PanelAccordion',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <PanelAccordion
        title={'Why wont my payment go through'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      />
    </div>
  );
};
