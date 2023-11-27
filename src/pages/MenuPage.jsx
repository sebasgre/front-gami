import { useNavigate } from "react-router-dom";
import { HOME_URL } from "../navigation/Constants";
const MenuPage = () => {
  const navigate = useNavigate();
  const loadNewGame = () => {
    // navigate(HOME_URL);
    // Aqui debemos cargar el juego de nuevo o reiniciar el progreso
  };
  const loadGame = () => {
    // navigate()
    // Aqui debemos cargar el progreso donde quedo guardado el juego
  };
  const exitGame = () => {
    navigate(HOME_URL);
  };
  return (
    <div className="body">
      <div className="frame1">
        <img src="https://www.logolynx.com/images/logolynx/7f/7fe85fb6677eaf8d18c3511c3fcaad79.png"></img>
      </div>
      <div className="frame">
        <div className="btn-group">
          <button className="button" type="button" onClick={loadNewGame()}>
            <h2>Nuevo juego</h2>
          </button>
          <button className="button" type="button" onClick={loadGame()}>
            <h2>Cargar juego</h2>
          </button>
          <button className="button" type="button" onClick={exitGame()}>
            <h2>Salir</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
