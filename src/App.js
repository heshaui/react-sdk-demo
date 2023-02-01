import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/home/home';
import Sdk from './pages/sdk/sdk'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/sdk' element={<Sdk/>}/>
      </Routes>
    </Router>
  );
}

export default App;
