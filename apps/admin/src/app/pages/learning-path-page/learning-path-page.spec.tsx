import { render } from '@testing-library/react';

import LearningPathPage from './learning-path-page';

describe('LearningPathPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LearningPathPage />);
    expect(baseElement).toBeTruthy();
  });
});
