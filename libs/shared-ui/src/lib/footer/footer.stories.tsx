import type { ComponentMeta } from '@storybook/react';
import { Footer } from './footer';

const Story: ComponentMeta<typeof Footer> = {
  component: Footer,
  title: 'Footer',
};
export default Story;

export const Default = () => {
  return (
    <div>
      <Footer companyLinks={[]} supportLinks={[]}/>
    </div>
  )
};