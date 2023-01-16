export const moveToFormData = (data: any) => {
  let input = new FormData();
  Object.keys(data).map((key) => {
    input.append( key, data[key]);
  });
  return input;
};
