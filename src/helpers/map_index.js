//imports latestMapIndex from "./mapdb"

import enmap from "enmap";
import fs from "fs";

//create /mapdb and handle error if it already exists
fs.mkdir(__dirname + '/mapdb', function (err) {if(err) console.log(err);});

//create/load persistant enmap in ./mapdb
const mapIndex = new enmap({name: "map-index", dataDir: __dirname + "/mapdb"});

//and load the json file with the default index if the db is not up-to-date
let mapIndexStatus = fs.readFileSync(__dirname + '\\mapindexstatus.json', function (err) {console.log(err);});
let mapIndexStatusCur = JSON.parse(mapIndexStatus);
// if (mapIndexStatusCur = );

let mapIndexJSON = fs.readFileSync(__dirname + '\\mapindex.json', function (err) {console.log(err);});
const defaultMapIndex = JSON.parse(mapIndexJSON);

//when db is ready, load values from mapindex.json into it
mapIndex.defer.then( () => {
mapIndex.ensure("map-index", defaultMapIndex);
console.log(mapIndex.get("map-index"));
});

