//loads latest map index and metadata from mapindex.json

import fs from 'fs';

let mapIndexJSON = fs.readFileSync(__dirname + '\\mapIndex.json', (err) => {console.log(err)});
const mapIndex = JSON.parse(mapIndexJSON);

console.log(mapIndex.mapArr);

 mapIndex.newTreeItem = (depth,iname,name,parent,slevel,srcb) => {

    let treeItem = document.createElement("div");
    let itemName = document.createTextNode(name);
    let itemParent = document.getElementById(parent);

//add name of item to the element and append item
    treeItem.appendChild(itemName);
    itemParent.appendChild(treeItem);

//set item id for appending children **REQUIRES PARENTS CREATED BEFORE CHILDREN**
    treeItem.id = iname;

//set order according to starting level
    treeItem.style.order = slevel;

//add class for styling
    if(depth == "top") {
        treeItem.classList.add("topTreeItem");
    } else if (depth == "sub") {
        treeItem.classList.add("subTreeItem");
    };
    
    console.log(srcb);
};

//loop through array of maps and create item for each
mapIndex.genNavTree = () => {
    for (let i of mapIndex.mapArr) {
        let curItem = mapIndex[i];
        let srcb = null;
        if (curItem.srcb != undefined) srcb = curItem.srcb;
        mapIndex.newTreeItem(curItem.depth,curItem.iname,curItem.name,curItem.parent,curItem.slevel,srcb);
    }
};

mapIndex.genNavTree();