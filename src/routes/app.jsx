import UserProfile from '../views/UserProfile/UserProfile';
import Groups from '../views/Groups/Groups';
import MyGroups from '../views/MyGroups/MyGroups';
import Home from '../views/Home/Home';
import NewPost from '../views/NewPost/NewPost';
import CreateGroup from '../views/Groups/CreateGroup/CreateGroup';
import CreateGroupPage2 from '../views/Groups/CreateGroup/CreateGroupPage2';
import CreateGroupPage3 from '../views/Groups/CreateGroup/CreateGroupPage3';


 
const appRoutes = [
    { path: "/home", name: "Home", icon: "pe-7s-home", component: Home},
    { path: "/user", name: "Meu perfil", icon: "pe-7s-user", component: UserProfile },
    { path: "/notifications", name: "Notificações", icon: "pe-7s-bell" },
    { path: "/groups", name: "Grupos", icon: "pe-7s-share", component: Groups },
    { path: "/MyGroups", name: "MyGroups", icon: "pe-7s-share", component: MyGroups },
    { path: "/NewPost", name: "Novo Post", icon: "pe-7s-file", component: NewPost },
    { path: "/CreateGroup", name: "CreateGroup", icon: "pe-7s-file", component: CreateGroup },
    { path: "/CreateGroupPage2", name: "CreateGroupPage2", icon: "pe-7s-file", component: CreateGroupPage2 },
    { path: "/CreateGroupPage3", name: "CreateGroupPage3", icon: "pe-7s-file", component: CreateGroupPage3 },
    { redirect: true, path:"/", to:"/home", name: "Home" }
];

export default appRoutes;
