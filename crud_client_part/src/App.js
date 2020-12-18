import logo from './logo.svg';
import './App.css';
import Home from './Component/Home/Home';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route  
} from "react-router-dom";
import Form from './Component/Form/Form';

export const DataContext = createContext([]);
 
function App() {

  const [singleData, setSingleData] = useState([]);
  return (

    <DataContext.Provider value={[singleData, setSingleData]} >
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/form">
            <Form></Form>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>        
    </DataContext.Provider>
  );
}

export default App;
