const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  save(input, callback) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename.original);
    const promises = [];

    //Save original photo
    promises.push(sharp(input).toFile(this.filepath(filename.original)));

    //Resize to small
    promises.push(
        sharp(input).resize(300, 300, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toFile(this.filepath(filename.small))
    );

    //Resize to medium
    promises.push(
        sharp(input).resize(700, 700, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toFile(this.filepath(filename.medium))
    );

    Promise.all(promises)
    .then(() => {
      console.log('saved all photos');
      callback(filename.original);
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