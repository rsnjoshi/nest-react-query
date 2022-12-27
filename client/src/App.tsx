import AppRouter from "./Router/appRouter";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
