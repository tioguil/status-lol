import {LiveGameCardTypes} from "../../components/NavBar/components/liveGameCard/liveGameCard.types";
import {ParticipantsTypes} from "../../components/participants/participants.types";

export type HomeTypes = {
  intervalId?:any,
  currentEvent?:LiveGameCardTypes;
  gameMetadata:HomeGameData;
}

export type HomeGameData = {
  "currentTime": string,
  "gameState": "in_game"|"finished",
  "patchVersion": string,
  "blueTeamMetadata": {
    "esportsTeamId": string,
    "totalGold": number,
    "inhibitors": number,
    "towers": number,
    "barons": number,
    "totalKills": number,
    "dragons": string[]
    "participantMetadata": ParticipantsTypes[]
  },
  "redTeamMetadata": {
    "esportsTeamId": string,
    "totalGold": number,
    "inhibitors": number,
    "towers": number,
    "barons": number,
    "totalKills": number,
    "dragons": string[]
    "participantMetadata": ParticipantsTypes[]
  }
}

export type HomePropsTypes = {
  home:HomeTypes;
  getFrames: (event?:LiveGameCardTypes)=> any;
  setIntervalId:(intervalId:any) => any
}