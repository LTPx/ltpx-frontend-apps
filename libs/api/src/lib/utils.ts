export const moveToFormData = (data: any) => {
  let input = new FormData();
  Object.keys(data).map((key) => {
    if (data[key]) {
      if (key === 'contents' || key === 'classroom') {
        const dataContent = data[key] || {};
        input.append(key, JSON.stringify(dataContent));
      } else {
        if (key === 'cover') {
          input.append('cover_image', data[key]);
        }
        if (key === 'degrees_files') {
          const files = data[key];
          const filesArray = Array.from(files);
          if (files.name) {
            input.append('degrees_files[]', files);
          } else {
            filesArray.map((file: any) => {
              input.append('degrees_files[]', file);
            });
          }
        }
        if (key !== 'cover' && key !== 'degrees_files') {
          input.append(key, data[key]);
        }
      }
    }
  });
  return input;
};

export const sendAsFormData = (data: any) => {
  let input = new FormData();
  Object.keys(data).map((key) => {
    if (data[key]) {
      if (key === 'social_networks') {
        const dataContent = data[key] || {};
        input.append(key, JSON.stringify(dataContent));
        return
      }
      if (key === 'profile_image') {
        input.append('profile_image', data[key]);
        return
      }
      input.append(key, data[key]);
    }
  });
  return input;
};

export const encapsuleInFormData = (data: any, settings?: {jsonKeys?:string[], imagesKeys?:string[]}) => {
  const jsons = settings?.jsonKeys || [];
  const images = settings?.imagesKeys || [];
  let input = new FormData();
  Object.keys(data).map((key) => {
    if (data[key]) {
      if (jsons.includes(key)) {
        const dataContent = data[key] || {};
        input.append(key, JSON.stringify(dataContent));
        return
      }
      if (images.includes(key)) {
        input.append(key, data[key]);
        return
      }
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
