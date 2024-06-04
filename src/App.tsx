import { Provider } from 'react-redux';

import './App.css';
import { AppContainer } from './components/app';
import store from './slices';

function App() {
  return (
    <Provider store={store}>
      <AppContainer></AppContainer>
    </Provider>
  );
}

export default App;
