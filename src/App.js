import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from "./routes";
//import { AppContext } from "./libs/contextLib";


// css
import './css/style.css'

function App(){
  //const [isAuthenticated, userHasAuthenticated] = useState(false);
  //function handleLogout() {
    //userHasAuthenticated(false);
  //}
  return(
    //Provider shows that all the child components should be able to access what we put in it
    //<AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Routes />
    //</AppContext.Provider>
  );
}
export default App;