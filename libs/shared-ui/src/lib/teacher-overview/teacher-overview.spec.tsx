import { render } from '@testing-library/react';

import TeacherOverview from './teacher-overview';

describe('TeacherOverview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherOverview name={''} profession={''} rating={0} reviews={0} students={0} courses={0} bibliography={''} image={''} />);
    expect(baseElement).toBeTruthy();
  });
});
