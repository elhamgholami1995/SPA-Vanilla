import Dashboard from './pages/dashboard.js'
import Products from './pages/product.js'
import Posts from './pages/posts.js'
import NotFound from './pages/notfound.js'


//  what  view  show to user based on route ?

function router (params){

    const routes = [
        {path : "/" , view :Dashboard},
        {path : '/products',view :Products },
        {path : '/posts', view :Posts},
    ];

    const potentialRoutes = routes.map ((item) =>{
        return{
            route : item,
            isMatch : location.pathname === item.path,
        };
    });

    let match = potentialRoutes.find ((route) => route.isMatch);

    if (!match) {
        match = {
            route : { path : "/not-found" , view :  NotFound },
            isMatch : true,
        };
    }
    document.querySelector('#app').innerHTML = match.route.view();
}


// 2.push user to new url

function navigateTo (url) {
    history.pushState(null,null,url);
    router();
}

window.addEventListener('popstate' , router);

// sidebar toggler
const sidebarToggler = document.querySelector ('.sidebar-toggler');
const sidebar = document.querySelector ('.nav');
sidebarToggler.addEventListener('click',()=>{
    sidebar.classList.toggle('mini-sidebar');

})




document.addEventListener('DOMContentLoaded', ()=>{
    document.body.addEventListener('click', (e)=>{
        if (e.target.hasAttribute ('data-link')){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
});
