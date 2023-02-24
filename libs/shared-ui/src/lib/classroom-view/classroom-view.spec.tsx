import { render } from '@testing-library/react';

import ClassroomView from './classroom-view';

describe('ClassroomView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassroomView />);
    expect(baseElement).toBeTruthy();
  });
});
