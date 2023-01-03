import type { ComponentMeta } from '@storybook/react';
import { GroupUsers } from './group-users';

const Story: ComponentMeta<typeof GroupUsers> = {
  component: GroupUsers,
  title: 'GroupUsers',
};

export default Story;

const images = [
  {
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29uc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29uc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
];

export const Default = () => {
  return (
    <div>
      <GroupUsers images={images} />
      <br />
      <br />
      <br />
      <GroupUsers images={images.slice(0, 3)} />
    </div>
  );
};
