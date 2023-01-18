export const moveToFormData = (data: any) => {
  let input = new FormData();
  Object.keys(data).map((key) => {
    if (key === 'contents' || key === 'classroom') {
      const dataContent = data[key] || {};
      input.append( key, JSON.stringify(dataContent));
    } else {
      if (key === 'cover') {
        input.append( 'cover_image', data[key]);
      }
      if (key === 'degrees_files') {
        const files = data[key];
        Array.from(files).map((file:any)=>{
          input.append('degrees_files[]', file);
        });
      }
      if (key !== 'cover' && key !== 'degrees_files') {
        input.append( key, data[key]);
      }
    }
  });
  return input;
};
