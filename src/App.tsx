import { Provider } from 'react-redux';

import './App.css';
import { AppContainer } from './components/app';
import store from './slices';
import { ThemeProvider } from 'styled-components';
import { theme } from './style';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContainer></AppContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
