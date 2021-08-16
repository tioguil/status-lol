import {LiveGameCardTypes} from "./components/liveGameCard/liveGameCard.types";
import {SchedulerGameCardTypes} from "./components/schedulerGameCard/schedulerGameCard.types";

export type navBarPropsTypes = {
  getLive:()=> any,
  setDrawerState:(state:boolean)=> any,
  getSchedule: ()=> any,
  setCurrentEvent: (currentEvent:LiveGameCardTypes) => any,
  navBar:NavBarReducer
}

export type NavBarReducer = {
  liveGames:LiveGameCardTypes[],
  scheduleGames:SchedulerGameCardTypes[],
  drawerState:boolean
}

