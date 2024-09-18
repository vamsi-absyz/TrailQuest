import "@mantine/core/styles.css";
import "./App.css";
import { Home } from "./components/home";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharcaterInfo } from "./components/charcaterInfo";
import ProtectedRoute from "./components/ProtectedRoutes";
import { Lead } from "./components/lead";

// const theme = createTheme({
//   /** Put your mantine theme override here */
// });

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lead />} />
          <Route element={<ProtectedRoute allowedRoles="USER" />}>
            <Route path="/home" element={<Home />} />
            <Route path="/character/" element={<CharcaterInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
