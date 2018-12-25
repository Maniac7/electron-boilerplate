//imports latestMapIndex from "./mapdb"

import enmap from "enmap";
import fs from "fs";

fs.mkdir(__dirname + '/mapdb', function (err) {
    if(err !== "EEXIST") console.log(err);
});

const mapIndex = new enmap({name: "map-index", dataDir: __dirname + "/mapdb"});

mapIndex.defer.then( () => {
mapIndex.ensure("map-index", {
    sectorIndex: "Eriador,Rhovanion,Gondor,Mordor"
});
console.log(mapIndex.get("map-index", "sectorIndex"));
});

