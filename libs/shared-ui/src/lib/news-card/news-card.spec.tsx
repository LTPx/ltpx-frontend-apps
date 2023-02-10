import { render } from '@testing-library/react';

import NewsCard from './news-card';

describe('NewsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewsCard />);
    expect(baseElement).toBeTruthy();
  });
});
