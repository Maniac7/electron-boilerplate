/* eslint max-len: ["error", { "code": 100 }] */
import env from 'env';
import fs from 'fs';
import Draggable from 'draggable';

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

new Draggable(viewport, {
  // limit: viewport,
});

const mapMeta = JSON.parse(mapMetaJSON);

mapLoader.loadCurMap = (el) => {
  const selectedMap = el.nextSibling.id;
  const mapSrc = mapMeta[selectedMap].mapSrc;
  mapLoader.isDown = false;
  mapLoader.offSet = null;

  // change background image of viewport
  viewport.src = '../maps/' + mapSrc;
};

// mapLoader.mouseDown = (e) => {
//   mapLoader.isDown = true;
//   mapLoader.offSet = [
//     e.target.offsetLeft - e.clientX,
//     e.target.offsetTop - e.clientY,
//   ];
// };

// mapLoader.mouseUp = (e) => {
//   mapLoader.isDown = false;
// };

// mapLoader.mouseMove = (e) => {
//   if (mapLoader.isDown) {
//     mapLoader.mousePosition = {
//       x: e.clientX,
//       y: e.clientY,
//     };
//     e.target.style.left = (mapLoader.mousePosition.x + mapLoader.offSet[0]) + 'px';
//     e.target.style.top = (mapLoader.mousePosition.y + mapLoader.offSet[1]) + 'px';
//   };
// };

// viewport.addEventListener('mousedown', mapLoader.mouseDown, true);
// viewport.addEventListener('mouseup', mapLoader.mouseUp, true);
// viewport.addEventListener('mousemove', mapLoader.mouseMove, true);

export default mapLoader;
