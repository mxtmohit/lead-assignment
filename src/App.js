
import { Skeleton } from '@mui/material';
import './App.css';
import DisplayInfo from './comps/appcomponents/displayInfo/DisplayInfo';
import Codeinput from './comps/appcomponents/enterPostalcode/Codeinput';

function App() {
  return (
    <div className="App">
      <Codeinput/>
      <DisplayInfo/>
      
    </div>
  );
}

export default App;
