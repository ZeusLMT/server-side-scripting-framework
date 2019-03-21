const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  save(input, callback) {
    const filename = Resize.filename();
    //const filepath = this.filepath(filename);

    sharp(input).resize(300, 300, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFile(this.filepath(filename.small))
    .then(() => {
      callback(filename.small);
    })
    .catch((error) => {
          console.log(error);
    });
  }

  static filename() {
    const filename = uuidv4();

    return { small: `${filename}_s.png`, medium: `${filename}_m.png`, original: `${filename}.png` };
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;