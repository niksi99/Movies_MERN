import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateMovie from './pages/CreateMovie'
import ShowMovie from './pages/ShowMovie'
import DeleteMovie from './pages/DeleteMovie'
import EditMovie from './pages/EditMovie'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<CreateMovie/>}/>
          <Route path='/showMovie/:id' element={<ShowMovie/>}/>
          <Route path='/delete/:id' element={<DeleteMovie/>}/>
          <Route path='/edit/:id' element={<EditMovie/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
