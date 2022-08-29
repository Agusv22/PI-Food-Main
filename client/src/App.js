import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import RecipeCreate from './components/RecipeCreate';
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path= "/" component= {LandingPage}/>
      <Route exact path = "/home" component={Home}/>
      <Route exact path = "/Recetas" component={RecipeCreate} />
      <Route exact path="/home/:id" component={RecipeDetail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
