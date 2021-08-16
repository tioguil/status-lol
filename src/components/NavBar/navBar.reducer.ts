import {reducerActionType} from "../../reducer/reducer.type";
import {NavBarReducer} from "./navBar.types";

const INITIAL_STATE:NavBarReducer = {
  liveGames:[],
  scheduleGames:[],
  drawerState: true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action:reducerActionType) => {
  switch (action.type) {
    case 'NAV_BAR_LIVE_GAMES':
      return {...state, liveGames: action.payload};
    case 'NAV_BAR_SCHEDULER_GAMES':
      return {...state, scheduleGames: action.payload};
    case 'NAV_BAR_DRAWER_STATE':
      return {...state, drawerState: action.payload};
    default:
      return state;
  }
}