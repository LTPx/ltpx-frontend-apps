import { render } from '@testing-library/react';

import TagsCard from './tags-card';

describe('TagsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TagsCard tags={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
