export const LOCAL_API_URL = 'http://localhost:3000';
export const STAGING_API_URL = 'https://ltpx-api-staging.up.railway.app';

export const getApiUrl = () => {
  if (window.location.host.includes('staging.growopenminds.com')) {
    return STAGING_API_URL;
  }
  return LOCAL_API_URL;
}
