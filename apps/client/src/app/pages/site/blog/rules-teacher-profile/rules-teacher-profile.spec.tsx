import { render } from '@testing-library/react';

import RulesTeacherProfile from './rules-teacher-profile';

describe('RulesTeacherProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RulesTeacherProfile />);
    expect(baseElement).toBeTruthy();
  });
});
