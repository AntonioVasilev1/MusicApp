import {render, page} from './lib.js';
import {getUserData} from './util.js';
import {loginPage} from './views/login.js';
import {registerPage} from './views/register.js'
import {logout} from './api/api.js';
import {homePage} from "./views/home.js";
import {catalogPage} from "./views/catalog.js";
import {detailsPage} from "./views/details.js";
import {createPage} from "./views/create.js";
import {editPage} from "./views/edit.js";
import {searchPage} from "./views/search.js";

const root = document.getElementById('main-content');

page(decorateContext);
page('/home', homePage);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage)
page('/catalog', catalogPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
page('/create', createPage)
page('/search', searchPage)


updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav();
    next();
}

document.getElementById('logoutBtn').addEventListener('click', onLogout);

function onLogout() {
    logout()
    updateUserNav()
    page.redirect('/home')
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('guestLogin').style.display = 'none';
        document.getElementById('guestRegister').style.display = 'none';
        document.getElementById('userCreate').style.display = 'inline';
        document.getElementById('userLogout').style.display = 'inline';
    } else {
        document.getElementById('guestLogin').style.display = 'inline';
        document.getElementById('guestRegister').style.display = 'inline';
        document.getElementById('userCreate').style.display = 'none';
        document.getElementById('userLogout').style.display = 'none';
    }
}