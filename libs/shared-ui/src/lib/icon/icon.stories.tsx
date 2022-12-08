import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from './icon';

const Story: ComponentMeta<typeof Icon> = {
  component: Icon,
  title: 'Icon',
};
export default Story;

const Template: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  icon: 'heart',
  size: 50,
  color: '#5096ec'
};
