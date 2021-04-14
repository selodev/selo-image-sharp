export const getImage = async () => {
  try {
    const response = await fetch(
      'http://localhost:8080/?url=http://localhost:3333/assets/images/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg&width=2800&height=2230&format=avif&quality=80',
    );
    const data = await response.json();
    console.log(JSON.stringify(data));
    /*  //const writer = fs.createWriteStream();
    const image = await new Promise(resolve => {
      const buffer = Buffer.from(data);
      console.log(data, buffer);
      const dest = path.resolve(path.join('src', 'assets', 'images', 'blocks.webp'));

      fs.writeFile(path.join(dest), buffer, 'binary', () => {
        resolve(data);
      });
    }); */
    return await data;
  } catch (error) {
    console.log(error);
  }
};
