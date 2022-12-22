import type {ComponentMeta } from '@storybook/react';
import { CommentCourse } from './comment-course';

const Story: ComponentMeta<typeof CommentCourse> = {
  component: CommentCourse,
  title: 'CommentCourse',
};

export default Story;

export const Card = () => {
  return (
    <div>
      <CommentCourse 
        reviewTitle={'Beautiful courses'}
        name={'Oscar Cafeao'}
        comment={'This course was well organized and covered a lot more details than any other Figma courses. I really enjoy it. One suggestions is that it can be much better if we could complete the prototype together. Since we created 24 frames, I really want to test it on Figma mirror to see all the connections. Could you please let me take a look at the complete prototype?. '}
        date={'a mont ago'} 
        image={'https://images.unsplash.com/photo-1642792743923-3fc2adcd1b84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'} />
    </div>
  )
};