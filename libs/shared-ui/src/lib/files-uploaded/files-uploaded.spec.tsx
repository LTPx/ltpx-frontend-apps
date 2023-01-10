import { render } from '@testing-library/react';

import FilesUploaded from './files-uploaded';

describe('FilesUploaded', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilesUploaded />);
    expect(baseElement).toBeTruthy();
  });
});
