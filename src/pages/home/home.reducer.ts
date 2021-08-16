import {reducerActionType} from "../../reducer/reducer.type";
import {HomeTypes} from "./home.types";
import {ParticipantsTypes} from "../../components/participants/participants.types";

const getParticipants = ()=> {
  return [...Array(5)].map((e,i)=>{
    const par:ParticipantsTypes = {
      championId:"Annie",
      participantId: i+1,
      role:"",
      summonerName:"",
      status:{
        totalGold:0,
        assists:0,
        deaths:0,
        creepScore:0,
        maxHealth:0,
        currentHealth:0,
        kills:0,
        level:1,
        participantId:1,
        items:[],
        wardsPlaced:0,
        wardsDestroyed:0,
        attackDamage:0,
        abilityPower:0,
        criticalChance:0,
        attackSpeed:0,
        lifeSteal:0,
        armor:0,
        magicResistance:0,
        tenacity:0
      }
    }
    return par;
  })
}

const INITIAL_STATE:HomeTypes = {
  intervalId:undefined,
  currentEvent:undefined,
  gameMetadata:{
    currentTime:"",
    gameState:"in_game",
    patchVersion:"",
    blueTeamMetadata:{
      esportsTeamId:"",
      barons:0,
      dragons: [],
      inhibitors:0,
      totalGold:0,
      totalKills:0,
      towers:0,
      participantMetadata: getParticipants()
    },
    redTeamMetadata:{
      esportsTeamId:"",
      barons:0,
      dragons: [],
      inhibitors:0,
      totalGold:0,
      totalKills:0,
      towers:0,
      participantMetadata: getParticipants()
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action:reducerActionType) => {
  switch (action.type) {
    case 'HOME_CURRENT_EVENT':
      return {...state, currentEvent: action.payload};
    case 'HOME_INTERVAL_ID':
      return {...state, intervalID: action.payload};
    case 'HOME_GAME_META_DATA':
      return {...state, gameMetadata: action.payload};
    default:
      return state;
  }
}