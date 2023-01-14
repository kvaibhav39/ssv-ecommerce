import { useRoutes } from "react-router-dom";
import getRoutes from "./routes";
import "./App.css";
import "./css/style.css";

function App() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.user.user);
  // const connectionType = useSelector((state) => state.auth0.connectionType);
  // console.log("connectionType", connectionType);

  // const [err, setErr] = useState(localStorage.getItem("error"));

  // useEffect(() => {
  //   console.log("******");
  // }, [connectionType]);

  // useEffect(() => {
  //   user && checkAuth(dispatch, setErr, navigate);
  // }, [err]);

  const routing = useRoutes(getRoutes());

  return <>{routing}</>;
}

export default App;
