import type {ComponentMeta } from '@storybook/react';
import { Tabs } from './tabs';

const Story: ComponentMeta<typeof Tabs> = {
  component: Tabs,
  title: 'Tabs',
};

export default Story;

const tabs = [
  {text:'home',selected:true},
  {text:'about'}
]

export const Default = () => {
  return (
    <div>
      <Tabs tabs={tabs}/>
    </div>
  )
};