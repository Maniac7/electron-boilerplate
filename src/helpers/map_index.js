//loads latest map index and metadata from mapindex.json

import fs from 'fs';

let mapIndexJSON = fs.readFileSync(__dirname + '\\mapIndex.json', (err) => {console.log(err)});
const mapIndex = JSON.parse(mapIndexJSON);

console.log(mapIndex.mapArr);

 mapIndex.newTreeItem = (depth,iname,name,parent,slevel,hasChild,srcb) => {

    let treeItem = document.createElement("div");
    let treeItemDiv = document.createElement("div");
    let itemName = document.createTextNode(name);
    let itemParent = document.getElementById(parent);

//add name of item to the element and append item
    treeItem.appendChild(itemName);
    treeItemDiv.appendChild(treeItem);
    itemParent.appendChild(treeItemDiv);

//set item id for appending children **REQUIRES PARENTS CREATED BEFORE CHILDREN**
    treeItemDiv.id = iname;

//set order according to starting level
    treeItemDiv.style.order = slevel;

//add class for styling
    if(depth == "top") {
        treeItem.classList.add("topTreeItem");
    } else if (depth == "sub") {
        treeItem.classList.add("subTreeItem");
        treeItemDiv.style.display = "none";
        treeItemDiv.classList.add("subParent");
    };

    //add event listener to call mapIndex.toggleShowChildren
    if (hasChild == "true") {
    treeItem.addEventListener("click", function(){mapIndex.toggleShowChildren(this);});
    }
    console.log(srcb);
};

//loop through array of maps and create item for each
mapIndex.genNavTree = () => {
    for (let iname of mapIndex.mapArr) {
        let curItem = mapIndex[iname];
        let srcb = null;
        if (curItem.hasOwnProperty("srcb")) {srcb = curItem.srcb};
        mapIndex.newTreeItem(curItem.depth,iname,curItem.name,curItem.parent,curItem.slevel,curItem.hasChild,srcb);
    }
};

//toggle whether the item's children are hidden or shown
mapIndex.toggleShowChildren = (el) => {
    let status = el.nextSibling.style.display;
    let itemSiblings = el.parentElement.children;
    if (el.parentElement.parentElement.id = "treeMaster") {
        console.log("Seems good!");
    }
    for (let i = 1; i < itemSiblings.length; i++) {
        let curItem = itemSiblings[i];
        if (status == "none") {
            curItem.style.display = "flex";
        }
        else {
            curItem.style.display = "none";
        }
    }
}

mapIndex.genNavTree();