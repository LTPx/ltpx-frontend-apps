import type { ComponentMeta } from '@storybook/react';
import { ColorsInfo, InfoCount } from './info-count';

const Story: ComponentMeta<typeof InfoCount> = {
  component: InfoCount,
  title: 'InfoCount',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <InfoCount count={2} text={'Course'} color={ColorsInfo.green} />
      <br />
      <InfoCount count={2} text={'Course'} />
      <br />
      <InfoCount count={2} text={'Course'} color={ColorsInfo.orange} />
    </div>
  );
};
