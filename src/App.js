
import { Skeleton } from '@mui/material';
import './App.css';
import DisplayInfo from './homepage/appcomponents/displayInfo/DisplayInfo';
import Codeinput from './homepage/appcomponents/enterPostalcode/Codeinput';

function App() {
  return (
    <div className="App">
      <Codeinput/>
      <DisplayInfo/>
      
    </div>
  );
}

export default App;
