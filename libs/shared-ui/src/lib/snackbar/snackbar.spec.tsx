import { render } from '@testing-library/react';

import Snackbar from './snackbar';

describe('Snackbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Snackbar text={''} open={false}/>);
    expect(baseElement).toBeTruthy();
  });
});
