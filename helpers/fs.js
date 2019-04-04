const fs = require('fs');

const saveToJson = (input, filename, callback) => {

  fs.readFile(filename, (error, data) => {
    if (error) {
      const obj = [input];

      writeJson(obj, filename, callback);
    } else {
      let newObj = JSON.parse(data);
      newObj.push(input);

      writeJson(newObj, filename, callback);
    }
  });

};

const writeJson = (obj, filename, callback) => {
  const json = JSON.stringify(obj, null, 2);

  fs.writeFile(filename, json, (error) => {
    if (error) throw error;
    callback();
  });
};

const deleteFile = (filepath) => {
  fs.unlink(filepath, (error) => {
    if(error) {
      console.log(error);
    }
  })
};

module.exports = { saveToJson, deleteFile };

