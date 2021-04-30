export const createHashFromFile = async (
  absoluteFilePath: string,
  length: number,
): Promise<any> => {
  const hash = await new Promise(async resolve => {
    const { createHash } = await import('crypto');
    const fs = (await import('fs')).default;
    const hash = createHash('sha1');
    fs.createReadStream(absoluteFilePath)
      .on('data', data => hash.update(data))
      .on('end', () => {
        const hashDigest = hash.digest('hex').toLowerCase().substr(0, length);
        resolve(hashDigest);
      });
  });
  return await hash;
};
