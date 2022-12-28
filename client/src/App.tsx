import AppRouter from "./Router/appRouter";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
