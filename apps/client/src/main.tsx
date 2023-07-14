import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './i18n';
import App from './app/app';
import TagManager from 'react-gtm-module';


const GTM_ID = process.env.NX_GOOGLE_ANALYTICS;

if (GTM_ID) {
  const tagManagerArgs = {
    gtmId: GTM_ID,
  };
  TagManager.initialize(tagManagerArgs);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
