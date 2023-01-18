export const moveToFormData = (data: any) => {
  let input = new FormData();
  Object.keys(data).map((key) => {
    if (key === 'contents' || key === 'classroom') {
      const dataContent = data[key] || {};
      input.append(key, JSON.stringify(dataContent));
    } else {
      input.append(key, data[key]);
    }
  });
  return input;
};

export const generateAlphabet = (capital = true) => {
  return [...Array(26)].map((_, i) =>
    String.fromCharCode(i + (capital ? 65 : 97))
  );
};
