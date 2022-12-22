import { render } from '@testing-library/react';

import BuyCourseCard from './buy-course-card';

describe('BuyCourseCard', () => {
  it('should render successfully', () => {
    const clickFunction = () => {
      console.log('click')
    };
    const { baseElement } = render(<BuyCourseCard price={0} discount={0} achievements={0} lectures={0} enrolled={0} language={''} skillLevel={''} certificate={false} image={''} onClickBuy={clickFunction} onClickEnroll={clickFunction}/>);
    expect(baseElement).toBeTruthy();
  });
});
