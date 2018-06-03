import UserProfile from '../views/UserProfile/UserProfile';
import Groups from '../views/Groups/Groups';
import MyGroups from '../views/MyGroups/MyGroups';
import Home from '../views/Home/Home';
import NewPost from '../views/Groups/Posts/NewPost';
import GroupPage from '../views/Groups/CreateGroup/GroupPage';
import Notifications from "../views/Notifications/Notifications";


const appRoutes = [
    {path: "/home", name: "Home", icon: "pe-7s-home", component: Home},
    {path: "/user", name: "Meu perfil", icon: "pe-7s-user", component: UserProfile},
    {path: "/notifications", name: "Notificações", icon: "pe-7s-bell", component: Notifications},
    {path: "/groups", name: "Grupos", icon: "pe-7s-share", component: Groups},
    {path: "/MyGroups", name: "Meus grupos", icon: "pe-7s-share", component: MyGroups},
    {path: "/NewPost", name: "Novo Post", icon: "pe-7s-file", component: NewPost},
    {path: "/GroupPage", name: "Novo Grupo", icon: "pe-7s-file", component: GroupPage},
    {redirect: true, path: "/", to: "/home", name: "Home"}
];

export default appRoutes;
