/* eslint max-len: ["error", { "code": 100 }] */
// loads latest map index and metadata from mapindex.json

import mapLoader from './map_loader.js';
import mapIndex from '../data/mapindex.json';

console.log(mapIndex.mapArr);

mapIndex.newTreeItem = (depth, iname, name, parent, slevel, hasChild, srcb) => {
  const treeItem = document.createElement('div');
  const treeItemDiv = document.createElement('div');
  const itemName = document.createTextNode(name);
  const itemParent = document.getElementById(parent);

  // add name of item to the element and append item
  treeItem.appendChild(itemName);
  itemParent.appendChild(treeItem);
  treeItem.insertAdjacentElement('afterend', treeItemDiv);

  // set item id for appending children **REQUIRES PARENTS CREATED BEFORE CHILDREN**
  treeItemDiv.id = iname;

  // set order according to starting level
  treeItemDiv.style.order = slevel;
  treeItem.style.order = slevel;

  // add classes for styling
  if (depth === 'top') {
    treeItem.classList.add('topTreeItem');
  } else if (depth === 'sub') {
    treeItem.classList.add('subTreeItem');
  };
  treeItemDiv.classList.add('subParent');
  treeItem.classList.add('navTreeItem');

  // add event listener to call mapIndex.toggleShowChildren
  if (hasChild == 'true') {
    const masterNavButton = document.getElementById('masterNavButton').firstChild.nextSibling;
    const navButtonClone = masterNavButton.cloneNode(true);
    treeItem.appendChild(navButtonClone);
    treeItem.addEventListener('click', function() {
      // eslint-disable-next-line no-invalid-this
      mapIndex.toggleShowChildren(this);
    });
  }

  treeItem.addEventListener('click', function() {
    // eslint-disable-next-line no-invalid-this
    mapLoader.loadCurMap(this);
  });

  console.log(srcb);
};

// loop through array of maps and create item for each
mapIndex.genNavTree = () => {
  for (const iname of mapIndex.mapArr) {
    const curItem = mapIndex[iname];
    let srcb = null;
    if (curItem.hasOwnProperty('srcb')) {
      srcb = curItem.srcb;
    };
    mapIndex.newTreeItem(curItem.depth, iname, curItem.name, curItem.parent,
        curItem.slevel, curItem.hasChild, srcb);
  }
};

// toggle whether the item's children are hidden or shown
mapIndex.toggleShowChildren = (el) => {
  const curItem = mapIndex[el.nextSibling.id];
  let mHeightChange;

  // handles rotating arrow
  el.firstChild.nextSibling.classList.toggle('rBackQuarter');

  // handles min/max height and height change within base element
  if (!el.nextSibling.style.maxHeight) {
    el.nextSibling.style.maxHeight = el.nextSibling.scrollHeight + 'px';
    el.nextSibling.style.minHeight = el.nextSibling.scrollHeight + 'px';
    mHeightChange = el.nextSibling.scrollHeight;
  } else {
    el.nextSibling.style.maxHeight = null;
    el.nextSibling.style.minHeight = null;
    mHeightChange = - el.nextSibling.scrollHeight;
  }

  el.classList.toggle('expandedNavItem');

  if (curItem.parent !== 'treeMaster') {
    // declare variables for changing min/max heights of parent elements
    let nextItem = mapIndex[curItem.parent];
    let nextEl = document.getElementById(curItem.parent);
    let newHeight;
    let nextElId;
    do {
      // update next element id and new height
      nextElId = nextItem.parent;
      newHeight = (parseFloat(nextEl.style.maxHeight) + mHeightChange) + 'px';

      // update min/max heights
      nextEl.style.maxHeight = newHeight;
      nextEl.style.minHeight = newHeight;

      // handles selecting new element & its data
      nextItem = mapIndex[nextElId];
      nextEl = document.getElementById(nextElId);
    } while (nextItem.depth !== 'notSub');
  }

  // for case where a top item is clicked
  // this will toggle the style changes for all of them (size, etc)
  if (el.parentElement.id === 'treeMaster') {
    if (mapIndex.checkTopOpen(el)) {
      console.log('another element is expanded');
    } else {
      mapIndex.toggleTopStyle(el);
    }
  }
};

// Checks if the top tree items are all closed except current element
mapIndex.checkTopOpen = (el) => {
  const topNavItems = document.getElementsByClassName('topTreeItem');
  for (let j = 0; j < topNavItems.length; j++) {
    if (topNavItems[j] != el) {
      if (topNavItems[j].classList.contains('expandedNavItem')) {
        return true;
      }
    }
  }
  return false;
};

// Toggles styles of all top tree item elements
mapIndex.toggleTopStyle = (el) => {
  const topNavItems = document.getElementsByClassName('topTreeItem');
  for (let j = 0; j < topNavItems.length; j++) {
    topNavItems[j].classList.toggle('topTreeItemE');
    topNavItems[j].parentElement.classList.toggle('topTreeDivS');
  }
};

// Gets total height of an element (inc padding, margin, etc.)
// mapIndex.outerHeight = (el) => {

//     // var styles = window.getComputedStyle(el);
//     // var margin = parseFloat(styles['marginTop']) +
//     //              parseFloat(styles['marginBottom']);

//     return Math.ceil(el.offsetHeight);
// }

export default mapIndex;
