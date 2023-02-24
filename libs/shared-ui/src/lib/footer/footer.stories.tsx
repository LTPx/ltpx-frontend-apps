import type { ComponentMeta } from '@storybook/react';
import { Footer } from './footer';

const Story: ComponentMeta<typeof Footer> = {
  component: Footer,
  title: 'Footer',
};
export default Story;
const companyLinks = [
  { text: 'Our Company', url: '/company'},
  { text: 'About us', url: '/about'},
  { text: 'Contact us', url: '/contact'},
  { text: 'Community', url: '/community'},
  { text: 'Blog', url: '/blog'},
];

const supportLinks = [
  { text: 'Documentation', url: '/documentation'},
  { text: 'Forums', url: '/forums'},
  { text: 'Language Packs', url: '/languages'},
  { text: 'Release', url: '/release'},
];
export const Default = () => {
  return (
    <div>
      <Footer companyLinks={companyLinks} supportLinks={supportLinks}/>
    </div>
  )
};
