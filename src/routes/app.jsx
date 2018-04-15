import UserProfile from '../views/UserProfile/UserProfile';
import Groups from '../views/Groups/Groups';
import Home from '../views/Home/Home'
import UserRegistration from "../views/UserRegistration/UserRegistration";


const appRoutes = [
    { path: "/home", name: "Home", icon: "pe-7s-home", component: Home},
    { path: "/user", name: "Meu perfil", icon: "pe-7s-user", component: UserProfile },
    { path: "/notifications", name: "Notificações", icon: "pe-7s-bell" },
    { path: "/groups", name: "Grupos", icon: "pe-7s-share", component: Groups },
    { redirect: true, path:"/", to:"/home", name: "Home" }
];

export default appRoutes;
