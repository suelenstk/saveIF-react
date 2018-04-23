import UserProfile from '../views/UserProfile/UserProfile';
import Groups from '../views/Groups/Groups';
import Home from '../views/Home/Home';
import UserRegistration from "../views/UserRegistration/UserRegistration";
import PostsView from '../views/Posts/PostsView';
import GroupEnter from '../views/Groups/GroupEnter';
import NewPost from '../views/NewPost/NewPost';
import CreateGroupPage1 from '../views/CreateGroup/CreateGroupPage1';
import CreateGroupPage2 from '../views/CreateGroup/CreateGroupPage2';
import CreateGroupPage3 from '../views/CreateGroup/CreateGroupPage3';

//Arquivo para rotas da barra lateral
 
const appRoutes = [
    { path: "/home", name: "Home", icon: "pe-7s-home", component: Home},
    { path: "/user", name: "Meu perfil", icon: "pe-7s-user", component: UserProfile },
    { path: "/notifications", name: "Notificações", icon: "pe-7s-bell" },
    { path: "/groups", name: "Grupos", icon: "pe-7s-share", component: Groups },
    { path: "/GroupEnter", name: "Solicitacao", icon: "pe-7s-share", component: GroupEnter },
    { path: "/NewPost", name: "Novo Post", icon: "pe-7s-file", component: NewPost },
    { path: "/CreateGroupPage1", name: "CreateGroupPage1", icon: "pe-7s-file", component: CreateGroupPage1 },
    { path: "/CreateGroupPage2", name: "CreateGroupPage2", icon: "pe-7s-file", component: CreateGroupPage2 },
    { path: "/CreateGroupPage3", name: "CreateGroupPage3", icon: "pe-7s-file", component: CreateGroupPage3 },
    { path: "/Posts", name: "Posts", icon: "pe-7s-share", component: PostsView }
];

export default appRoutes;
