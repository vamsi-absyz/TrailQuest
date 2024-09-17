import "@mantine/core/styles.css";
import "./App.css";
import { Home } from "./components/home";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharcaterInfo } from "./components/charcaterInfo";
import SignIn from "./pages/signin";
import ProtectedRoute from "./components/ProtectedRoutes";
import { Lead } from "./components/lead";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
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
