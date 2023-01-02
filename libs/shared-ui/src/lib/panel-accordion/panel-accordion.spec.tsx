import { render } from '@testing-library/react';

import PanelAccordion from './panel-accordion';

describe('PanelAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PanelAccordion />);
    expect(baseElement).toBeTruthy();
  });
});
