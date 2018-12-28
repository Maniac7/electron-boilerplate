//loads latest map index from mapindex.json

import fs from 'fs';

let mapIndexJSON = fs.readFileSync(__dirname + '\\mapindex.json', (err) => {console.log(err)});
const mapIndex = JSON.parse(mapIndexJSON);

console.log(mapIndex);

//initialise object containing all map names
