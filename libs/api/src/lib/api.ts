export const LOCAL_API_URL ='http://localhost:3000';
export const STAGING_API_URL = 'https://growopenmind-api.fly.dev';

const clientUrl = 'growopendminds.netlify.app';
const adminUrl = 'admin-system-growopenminds.netlify.app';

export const getApiUrl = () => {
  if (window.location.host.includes(clientUrl) || window.location.host.includes(adminUrl) ) {
    return STAGING_API_URL;
  }
  return LOCAL_API_URL;
}
