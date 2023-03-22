import { render } from '@testing-library/react';

import ChatNewPrivateRoom from './chat-new-private-room';

describe('ChatNewPrivateRoom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatNewPrivateRoom users={[]} onClose={()=> console.log()}/>);
    expect(baseElement).toBeTruthy();
  });
});
