import axios from "axios";
import {urlMap, appKey} from "../../api.utils";
import {LiveGameCardTypes} from "./components/liveGameCard/liveGameCard.types";
import {getFrames} from "../../pages/home/home.action";

export const getLive = ()=>{
  return (dispatch:any)=>{
    axios.get(urlMap.getLive,
      {
        headers: {
          "x-api-key": appKey,
        },
      })
      .then((response)=>{
        dispatch({
          type:"NAV_BAR_LIVE_GAMES",
          payload: response.data.data.schedule.events
        });
        // console.log(response.data.data.schedule.events);
      }).catch((err)=>{
        console.log(err);
    })
  }
}

export const  getSchedule = () =>{
  return(dispatch:any)=>{
    axios.get(urlMap.getSchedule,
      {
        headers: {
          "x-api-key": appKey,
        },
      }).then((response)=>{
        const schedulers = response.data.data.schedule.events.filter((e:any)=> e.state === "unstarted");
        dispatch({
          type:"NAV_BAR_SCHEDULER_GAMES",
          payload:schedulers
        })
    })
  }
}

export const setDrawerState = (state:boolean)=>{
  return (dispatch:any)=>{
    dispatch({
      type:"NAV_BAR_DRAWER_STATE",
      payload:state
    })
  }
}

export const setCurrentEvent = (currentEvent:LiveGameCardTypes) =>{
  return (dispatch:any)=>{
    // https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=pt-BR&id=105798784640628676

    axios.get(urlMap.getEventDetails, {
      params: {
        "hl": "pt-BR",
        "id": currentEvent.id,
      },
      headers: {
        "x-api-key": appKey,
      },
    }).then((response)=>{
    console.log("response", response)

      console.log(response.data.data.event)

      currentEvent = {
        ...currentEvent,
        match:response.data.data.event.match
      }

      dispatch({
        type:"HOME_CURRENT_EVENT",
        payload:currentEvent
      })

      dispatch({
        type:"NAV_BAR_DRAWER_STATE",
        payload:false
      })
      console.log(currentEvent)
      getFrames(currentEvent)(dispatch);
    })
  }
}