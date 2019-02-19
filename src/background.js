/* eslint max-len: ["error", { "code": 100 }] */
// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import {app, Menu} from 'electron';
import {devMenuTemplate} from './menu/dev_menu_template';
import {editMenuTemplate} from './menu/edit_menu_template';
import createWindow from './helpers/window';
import {createUserTask} from './helpers/new_task';
import jetpack from 'fs-jetpack';
import Store from 'electron-store';
// eslint-disable-next-line no-unused-vars
const settings = new Store();
const appDir = jetpack.cwd(app.getAppPath());

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from 'env';

const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  if (env.name !== 'production') {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
  setApplicationMenu();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    frame: false,
    minHeight: 500,
    minWidth: 900,
  });

  mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true,
      })
  );

  if (env.name === 'development') {
    mainWindow.openDevTools();
    // Create shortcut for opening app
    createUserTask('Maniac Map', 'Launch a new instance', appDir, process.execPath);
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
