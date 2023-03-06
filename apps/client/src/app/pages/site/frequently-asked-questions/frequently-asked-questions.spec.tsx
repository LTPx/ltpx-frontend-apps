import { render } from '@testing-library/react';

import FrequentlyAskedQuestions from './frequently-asked-questions';

describe('FrequentlyAskedQuestions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrequentlyAskedQuestions />);
    expect(baseElement).toBeTruthy();
  });
});
