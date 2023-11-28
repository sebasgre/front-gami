import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import {
  GENEROLIST_URL,
  HOME_URL,
  USERCREATE_URL,
  USERLIST_URL,
  GENEROCREATE_URL,
  JUEGOLIST_URL,
  JUEGOCREATE_URL,
  JUEGOPATCH_URL,
  LISTAMAIN_URL,
  JUEGOMAIN_URL,
  DETALLESJUEGOMAIN_URL,
  JUEGOBUSCA_URL,
  MENU_URL,
} from "./Constants";
import UserList from "../pages/Usuarios/UsuarioListPage";
import UserForm from "../pages/Usuarios/UsuarioFormPage";
import GeneroList from "../pages/generos/GenerosListPage";
import GeneroForm from "../pages/generos/GeneroFromPage";
import JuegosList from "../pages/juegos/JuegosListPage";
import JuegosForm from "../pages/juegos/JuegosFromPage";
import JuegosPatch from "../pages/juegos/JuegosPatvh";
import MainPage from "../pages/Main/MainPage";
import JuegoMainPage from "../pages/Main/JuegosMainPage";
import DetallesJuegos from "../pages/Main/DetalleJuegoPage";
import JuegoBuscaPage from "../pages/Main/BuscadorPage";
import MenuPage from "../pages/MenuPage";

export const router = createBrowserRouter([
  {
    path: HOME_URL,
    element: <HomePage />,
  },
  {
    path: MENU_URL,
    element: <MenuPage />,
  },
  {
    path: USERLIST_URL,
    element: <UserList />,
  },
  {
    path: USERCREATE_URL,
    element: <UserForm />,
  },
  {
    path: USERCREATE_URL + "/:id",
    element: <UserForm />,
  },
  {
    path: GENEROLIST_URL,
    element: <GeneroList />,
  },
  {
    path: GENEROCREATE_URL,
    element: <GeneroForm />,
  },
  {
    path: GENEROCREATE_URL + "/:id",
    element: <GeneroForm />,
  },
  {
    path: JUEGOLIST_URL,
    element: <JuegosList />,
  },
  {
    path: JUEGOCREATE_URL + "/:id",
    element: <JuegosForm />,
  },
  {
    path: JUEGOCREATE_URL,
    element: <JuegosForm />,
  },
  {
    path: JUEGOPATCH_URL + "/:id",
    element: <JuegosPatch />,
  },
  {
    path: LISTAMAIN_URL,
    element: <MainPage />,
  },
  {
    path: JUEGOMAIN_URL + "/:id",
    element: <JuegoMainPage />,
  },
  {
    path: DETALLESJUEGOMAIN_URL + "/:id",
    element: <DetallesJuegos />,
  },
  {
    path: JUEGOBUSCA_URL,
    element: <JuegoBuscaPage />,
  },
]);
