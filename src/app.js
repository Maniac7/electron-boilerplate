/* eslint max-len: ["error", { "code": 100 }] */
/* eslint-disable no-unused-vars */
import './stylesheets/main.css';

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';
import './helpers/navbuttons.js';
import './helpers/map_index.js';

import {remote} from 'electron';
import jetpack from 'fs-jetpack';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

document.getElementById('viewport').style.backgroundImage = 'url(\'../maps/defaultm.jpg\')';
