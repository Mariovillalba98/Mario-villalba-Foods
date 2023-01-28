import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from "./components/LandingPage"
import RecipesCreate from './components/RecipesCreate';
import Detail from './components/Detail';
import ErrorNotFound from './components/ErrorNotFound'
import MainHome from './components/MainHome';
import './App.css';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="contenedor-principal"> 
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={MainHome}/>
        <Route path="/form"  component={RecipesCreate} />
        <Route path = "/home/:id" component = {Detail}/>
        <Route path = '*' component = {ErrorNotFound}/>
      </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
