export function formatErrors(error: any) {
  if (error.length) {
    return error;
  } else {
    const data = error?.response?.data || {};
    if (data.errors) {
      return Object.values(data.errors).join(', ');
    } else {
      const message = data.length ? data : Object.values(data).join(', ');
      return message;
    }
  }
}
