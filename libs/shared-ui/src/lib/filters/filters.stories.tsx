import type { ComponentMeta } from '@storybook/react';
import { Filters } from './filters';

const Story: ComponentMeta<typeof Filters> = {
  component: Filters,
  title: 'Filters',
};

export default Story;

const filters = [
  {text:'Art' , count: 8},
  {text:'Exercise' , count: 8},
  {text:'Material Design' , count: 7},
  {text:'Software Development' , count: 6},
  {text:'Music', count: 6},
  {text:'Photography'}
]

export const Default = () => {
  return (
    <div>
      <Filters filters={filters} title={'Category'}/>
    </div>
  );
};