import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Login from './components/Login';
import Translations from './components/Translations';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/'            element = { <Login/> }/>
          <Route path='Translations' element = { <Translations/> }/>
          <Route path='Profile'      element = { <Profile/> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
