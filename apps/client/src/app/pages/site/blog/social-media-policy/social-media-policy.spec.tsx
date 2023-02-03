import { render } from '@testing-library/react';

import SocialMediaPolicy from './social-media-policy';

describe('SocialMediaPolicy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SocialMediaPolicy />);
    expect(baseElement).toBeTruthy();
  });
});
