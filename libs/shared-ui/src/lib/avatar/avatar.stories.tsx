import type {ComponentMeta } from '@storybook/react';
import { Avatar, AvatarSize } from './avatar';

const Story: ComponentMeta<typeof Avatar> = {
  component: Avatar,
  title: 'Avatar',
};

export default Story;

export const styles = () => {
  return (
    <div className="content">
      <div>
        <Avatar image = {'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'} size ={AvatarSize.large}/>
        <br/>
        <Avatar image = {'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'} size ={AvatarSize.medium}/>
        <br/>
        <Avatar image = {'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'} size ={AvatarSize.small}/>
      </div>
    </div>
  )
};