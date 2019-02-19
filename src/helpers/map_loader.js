/* eslint max-len: ["error", { "code": 100 }] */
import env from 'env';
import fs from 'fs';

const mapLoader = {};
let mapMetaJSON;

if (env.name == 'production') {
  mapMetaJSON = fs.readFileSync(`${process.resourcesPath}/mapMeta.json`, (err) => {
    console.log(err);
  });
} else if (env.name == 'development') {
  mapMetaJSON = fs.readFileSync(`./mapMeta.json`, (err) => {
    console.log(err);
  });
}

const mapMeta = JSON.parse(mapMetaJSON);

mapLoader.loadCurMap = (el) => {
  const selectedMap = el.nextSibling.id;
  const mapSrc = mapMeta[selectedMap].mapSrc;

  // change background image of viewport
  document.getElementById('viewport').style.backgroundImage = 'url(\'../maps/' + mapSrc + '\')';
};

mapLoader.moveMap = (el) => {

};

export default mapLoader;
