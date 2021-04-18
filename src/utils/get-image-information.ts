export const getImageInformation = ({ src, width, height, format }) => {
  const file = src.split('/').pop();
  const [fileName] = file.split('.');
  const srcPath = src.replace(`${file}`, '');
  const fileWidth = width ? `-${Math.round(width)}` : '';
  const fileHeight = height ? `x${Math.round(height)}` : '';
  const formattedFileName = `${fileName}${fileWidth}${fileHeight}.${format}`;
  return {
    formattedFileName,
    fileName,
    file,
    srcPath,
  };
};
