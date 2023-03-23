export function formatErrors(error: any) {
  const data = error?.response?.data || {};
  if (data.errors) {
    return Object.values(data.errors).join(', ');
  } else {
    const message = data.length ? data : Object.values(data).join(', ');
    return message;
  }
}
