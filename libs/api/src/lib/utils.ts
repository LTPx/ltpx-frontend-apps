export const moveToFormData = (data: any) => {
  let input = new FormData();
  Object.keys(data).map((key) => {
    if (key === 'contents' || key === 'classroom') {
      input.append( key, JSON.stringify(data[key]));
    } else {
      input.append( key, data[key]);
    }
  });
  return input;
};
