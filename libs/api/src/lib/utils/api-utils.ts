export function formatErrors(error: any) {
  return Object.values(error?.response?.data).join(', ');
}
