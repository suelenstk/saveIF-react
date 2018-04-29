import UserRegistration from "../views/UserRegistration/UserRegistration";
import Login from '../views/Login/Login';

const noAutenticationRoutes = [
    { path: "/cadastro", name:"Cadastro", component: UserRegistration },
    { redirect: true, path:"/", to:"/login", name: "Login" }
];

export default noAutenticationRoutes;