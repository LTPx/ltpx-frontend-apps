import { render } from '@testing-library/react';

import Certificate from './certificate';

describe('Certificate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Certificate teacherName={''} titleCourse={''} totalTask={0} totalQuizzes={0} totalAchievements={0} date={''} link={''}/>);
    expect(baseElement).toBeTruthy();
  });
});
