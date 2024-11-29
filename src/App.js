import './App.css';
import Cuisines from './Cuisines';
import Categories from './Categories';
import Subcategories from './Subcategories';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
<div>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Cuisines/>}/>
    <Route path='/Categories' element={<Categories/>}/>
    <Route path='/Subcategories' element={<Subcategories/>}/>
  </Routes>
  </BrowserRouter>
</div>
  );
}

export default App;
