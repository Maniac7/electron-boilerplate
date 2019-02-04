//loads latest map index and metadata from mapindex.json

import fs from 'fs';
import env from 'env';

let mapIndex;
let mapIndexJSON;
if (env.name == "production"){
    mapIndexJSON = fs.readFileSync(`${process.resourcesPath}/mapindex.json`, (err) => {console.log(err)});
}
else if (env.name == "development"){
    mapIndexJSON = fs.readFileSync(`./mapindex.json`, (err) => {console.log(err)});
}

mapIndex = JSON.parse(mapIndexJSON);

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

//add classes for styling
    if(depth == "top") {
        treeItem.classList.add("topTreeItem");
        treeItemDiv.style.maxHeight = treeItemDiv.offsetHeight + 1 + "px"
    } else if (depth == "sub") {
        treeItem.classList.add("subTreeItem");
        treeItemDiv.style.display = "none";
        treeItemDiv.classList.add("subParent");
    };
    
    treeItem.classList.add("navTreeItem");

    //add event listener to call mapIndex.toggleShowChildren
    if (hasChild == "true") {
        let masterNavButton = document.getElementById("masterNavButton").firstChild.nextSibling;
        let navButtonClone = masterNavButton.cloneNode(true);
        treeItem.appendChild(navButtonClone);
        treeItem.addEventListener("click", function(){mapIndex.toggleShowChildren(this);});
    }

    // add max-height based on total height of element
    // let maxH = JSON.stringify(treeItemDiv.offsetHeight + 1);
    // treeItemDiv.style.maxHeight = maxH + "px";

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
    // for case where a top item is clicked
    // this will toggle the style changes for all of them (size, etc)
    if (el.parentElement.parentElement.id == "treeMaster") {
        if (mapIndex.checkTopOpen(el)) {
            console.log("another element is expanded");
        }
        else {
            mapIndex.toggleTopStyle(el);
        }
    }
    // toggles visibility of all sub tree items
    for (let i = 1; i < itemSiblings.length; i++) {
        let curItem = itemSiblings[i];
        if (status == "none") {
            curItem.style.display = "flex";
            el.classList.add("expandedNavItem");
            curItem.style.maxHeight = 32 + "px";
        }
        else {
            curItem.style.display = "none";
            if (el.classList.contains("expandedNavItem")) {
                el.classList.remove("expandedNavItem");
            }
        }
    }
}

//Checks if the top tree items are all closed except current element
mapIndex.checkTopOpen = (el) => {
    let topNavItems = document.getElementsByClassName("topTreeItem");
    for (let j = 0; j < topNavItems.length; j++) {
        if (topNavItems[j] != el) {
            if (topNavItems[j].classList.contains("expandedNavItem")) {
                return true;
            }
        }
    }
    return false;
}

//Toggles styles of all top tree item elements
mapIndex.toggleTopStyle = (el) => {
    let topNavItems = document.getElementsByClassName("topTreeItem");
    for (let j = 0; j < topNavItems.length; j++) {
        if (topNavItems[j] !== el) {
            if (topNavItems[j].classList.includes("topTreeItemE")) {
                topNavItems[j]
            } else {
                topNavItems[j].parentElement.style.maxHeight = "34px";
            }
        }
        topNavItems[j].classList.toggle("topTreeItemE");
    }
}

//Gets total height of an element (inc padding, margin, etc.)
// mapIndex.outerHeight = (el) => {

//     // var styles = window.getComputedStyle(el);
//     // var margin = parseFloat(styles['marginTop']) +
//     //              parseFloat(styles['marginBottom']);
  
//     return Math.ceil(el.offsetHeight);
// }

mapIndex.genNavTree();