import UserRegistration from "../views/UserRegistration/UserRegistration";
import Recover from "../views/UserRegistration/Recover";

const noAutenticationRoutes = [
    {path: "/cadastro", name: "Cadastro", component: UserRegistration},
    {path: "/recover/:email", name: "Recuperar", component: Recover},
    {redirect: true, path: "/", to: "/login", name: "Login"}
];

export default noAutenticationRoutes;