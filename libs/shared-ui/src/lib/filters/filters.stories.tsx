import type { ComponentMeta } from '@storybook/react';
import { Filters } from './filters';

const Story: ComponentMeta<typeof Filters> = {
  component: Filters,
  title: 'Filters',
};

export default Story;

const filters = [
  {text:'Art (8)'},
  {text:'Exercise (8)'},
  {text:'Material Design (7)'},
  {text:'Software Development (6)'},
  {text:'Music (6)'},
  {text:'Photography (6)'}
]

export const Default = () => {
  return (
    <div>
      <Filters filters={filters} title={'Category'}/>
    </div>
  );
};