/* eslint max-len: ["error", { "code": 100 }] */
import env from 'env';
import fs from 'fs';

const mapLoader = {};
let mapMetaJSON;
const viewport = document.getElementById('viewport');

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
  mapLoader.isDown = false;
  mapLoader.offSet = null;

  // change background image of viewport
  viewport.style.backgroundImage = 'url(\'../maps/' + mapSrc + '\')';
};

mapLoader.mouseDown = (e) => {
  mapLoader.isDown = true;
  mapLoader.offSet = [
    e.target.offsetLeft - e.clientX,
    e.target.offsetTop - e.clientY,
  ];
};

mapLoader.mouseUp = (e) => {
  mapLoader.isDown = false;
};

viewport.addEventListener('mousedown', mapLoader.mouseDown, true);

export default mapLoader;
