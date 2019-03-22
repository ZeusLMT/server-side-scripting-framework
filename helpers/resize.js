const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  save(input, callback) {
    const filename = Resize.filename();
    const originalPath = this.filepath(filename.original);
    const smallPath = this.filepath(filename.small);
    const mediumPath = this.filepath(filename.medium);
    const promises = [];

    //Save original photo
    promises.push(sharp(input).toFile(originalPath));

    //Resize to small
    promises.push(
        sharp(input).resize(300, 300, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toFile(smallPath)
    );

    //Resize to medium
    promises.push(
        sharp(input).resize(700, 700, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toFile(mediumPath)
    );

    Promise.all(promises)
    .then(() => {
      console.log('saved all photos');

      const filePaths = {
        thumbnail: smallPath,
        image: mediumPath,
        original: originalPath
      };

      callback(filePaths);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  static filename() {
    const filename = uuidv4();

    return { small: `${filename}_small.png`, medium: `${filename}_medium.png`, original: `${filename}.png` };
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;