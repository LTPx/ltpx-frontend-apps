import { render } from '@testing-library/react';

import SettingsAppPage from './settings-app-page';

describe('SettingsAppPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsAppPage />);
    expect(baseElement).toBeTruthy();
  });
});
