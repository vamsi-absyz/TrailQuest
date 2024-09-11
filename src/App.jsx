import '@mantine/core/styles.css';
import './App.css'
import { Home } from './components/home';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});


function App() {
  return (
    <MantineProvider theme={theme}>
      <Home/>
    </MantineProvider>
  )
}

export default App
