import { render } from '@testing-library/react';

import LearningInOpenMind from './learning-in-open-mind';

describe('LearningInOpenMind', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LearningInOpenMind />);
    expect(baseElement).toBeTruthy();
  });
});
