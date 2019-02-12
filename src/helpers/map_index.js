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

    let treeItem = document.createElement("div"),
        treeItemDiv = document.createElement("div"),
        itemName = document.createTextNode(name),
        itemParent = document.getElementById(parent);

//add name of item to the element and append item
    treeItem.appendChild(itemName);
    itemParent.appendChild(treeItem);
    treeItem.insertAdjacentElement("afterend", treeItemDiv)

//set item id for appending children **REQUIRES PARENTS CREATED BEFORE CHILDREN**
    treeItemDiv.id = iname;

//set order according to starting level
    treeItemDiv.style.order = slevel;
    treeItem.style.order = slevel;

//add classes for styling
    if(depth === "top") {
        treeItem.classList.add("topTreeItem");
    } else if (depth === "sub") {
        treeItem.classList.add("subTreeItem");
    };
    treeItemDiv.classList.add("subParent")
    treeItem.classList.add("navTreeItem");

    //add event listener to call mapIndex.toggleShowChildren
    if (hasChild == "true") {
        let masterNavButton = document.getElementById("masterNavButton").firstChild.nextSibling;
        let navButtonClone = masterNavButton.cloneNode(true);
        treeItem.appendChild(navButtonClone);
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
    let curItem = mapIndex[el.nextSibling.id];
    let mHeightChange;

    // handles rotating arrow
    el.firstChild.nextSibling.classList.toggle("rBackQuarter");

    // handles min/max height and height change within base element
    if (!el.nextSibling.style.maxHeight) {
        el.nextSibling.style.maxHeight = el.nextSibling.scrollHeight + "px";
        el.nextSibling.style.minHeight = el.nextSibling.scrollHeight + "px";
        mHeightChange = el.nextSibling.scrollHeight;
    } else {
        el.nextSibling.style.maxHeight = null;
        el.nextSibling.style.minHeight = null;
        mHeightChange = - el.nextSibling.scrollHeight
        }

    el.classList.toggle("expandedNavItem");
 
    if (curItem.parent !== "treeMaster") {
        // declare variables for changing min/max heights of parent elements
        let nextItem = mapIndex[curItem.parent],
            nextEl = document.getElementById(curItem.parent),
            newHeight,
            nextElId;
    do {
        // update next element id and new height
        nextElId = nextItem.parent;
        newHeight = (parseFloat(nextEl.style.maxHeight) + mHeightChange) + "px";

        // update min/max heights
        nextEl.style.maxHeight = newHeight;
        nextEl.style.minHeight = newHeight;

        // handles selecting new element
        nextItem = mapIndex[nextElId];
        nextEl = document.getElementById(nextElId);
    } while (nextItem.depth !== "notSub")
}

    // for case where a top item is clicked
    // this will toggle the style changes for all of them (size, etc)
    if (el.parentElement.id === "treeMaster") {
        if (mapIndex.checkTopOpen(el)) {
            console.log("another element is expanded");
        }
        else {
            mapIndex.toggleTopStyle(el);
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
        topNavItems[j].classList.toggle("topTreeItemE");
        topNavItems[j].parentElement.classList.toggle("topTreeDivS");        
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