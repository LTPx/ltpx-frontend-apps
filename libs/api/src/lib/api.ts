export const LOCAL_API_URL = 'http://localhost:3000';
export const STAGING_API_URL = 'https://ltpx-api.fly.dev';

const clientUrl = 'staging.growopenminds.com';
const adminUrl = 'admin-growopenminds.netlify.app';

export const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.location.host.includes(clientUrl) || window.location.host.includes(adminUrl) ) {
      return STAGING_API_URL;
    }
  }

  return LOCAL_API_URL;
}
