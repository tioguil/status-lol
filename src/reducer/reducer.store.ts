import {combineReducers} from 'redux';
import navBarReducer from "../components/NavBar/navBar.reducer";
import homeReducer from "../pages/home/home.reducer";

const rootReducers = combineReducers({
  navBar:navBarReducer,
  home:homeReducer
});

export default rootReducers;