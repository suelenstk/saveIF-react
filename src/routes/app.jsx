import UserProfile from '../views/UserProfile/UserProfile';
import Groups from '../views/Groups/Groups';


const appRoutes = [
    { path: "/home", name: "Home", icon: "pe-7s-home" },
    { path: "/user", name: "Meu perfil", icon: "pe-7s-user", component: UserProfile },
    { path: "/notifications", name: "Notificações", icon: "pe-7s-bell" },
    { path: "/Groups", name: "Grupos", icon: "pe-7s-share", component: Groups },
    { redirect: true, path:"/", to:"/home", name: "Home" }
];

export default appRoutes;
