import {LiveGameCardTypes} from "../../components/NavBar/components/liveGameCard/liveGameCard.types";
import axios from "axios";
import {appKey, urlMap} from "../../api.utils";
import {store} from "../../index";
import {HomeGameData} from "./home.types";


export const getISODateMultiplyOf10 = () => {
  let date = new Date(Date.now() - 16000);
  date.setMilliseconds(0);

  if(date.getSeconds() % 10 !== 0) {
    date.setSeconds(date.getSeconds() - date.getSeconds() % 10);
  }
  return "2021-04-08T00:16:40.000Z";
  return date.toISOString();
}


export const setIntervalId = (intervalId:any ) =>{
  return(dispatch:any)=>{
    dispatch({
      type:"HOME_INTERVAL_ID",
      payload:intervalId
    })
  }
}


export const getFrames = (event?:LiveGameCardTypes)=>{
  return(dispatch:any)=>{

    console.log("event", event)
    const intervalId = setInterval(()=>{
      const gameMetadata = store.getState().home.gameMetadata;
      const currentDate = getISODateMultiplyOf10();
      // @ts-ignore
      const id = event?.match?.games.find((g)=> g.state === "inProgress").id||"";
      console.log("id", id)
      getDetailGame(id, currentDate, gameMetadata)(dispatch);
      getWindowGame(id, currentDate, gameMetadata)(dispatch);
    },1000)

    setIntervalId(intervalId)(dispatch);

  }
}


export const getDetailGame = (id:any, date:any, gameMetadata:HomeGameData)=>{
  return(dispatch:any)=>{
    axios.get(`${urlMap.feed}/details/${id}`, {
      params: {
        "hl": "pt-BR",
        "startingTime": date,
      },
      headers: {
        "x-api-key": appKey,
      },
    }).then((response)=>{

      if(response.data){
        const frame = response.data.frames[response.data.frames.length -1];

        gameMetadata.blueTeamMetadata.participantMetadata = gameMetadata.blueTeamMetadata.participantMetadata.map((p, i)=>{
          const fP = frame.participants.find((fP:any) => fP.participantId === p.participantId);
          p.status.items = fP.items;
          p.status.wardsPlaced = fP.wardsPlaced;
          p.status.wardsDestroyed = fP.wardsDestroyed;
          p.status.attackDamage = fP.attackDamage;
          p.status.abilityPower = fP.abilityPower;
          p.status.criticalChance = fP.criticalChance;
          p.status.attackSpeed = fP.attackSpeed;
          p.status.lifeSteal = fP.lifeSteal;
          p.status.armor = fP.armor;
          p.status.magicResistance = fP.magicResistance;
          p.status.tenacity = fP.tenacity;
          return p;
        })

        gameMetadata.redTeamMetadata.participantMetadata = gameMetadata.redTeamMetadata.participantMetadata.map((p, i)=>{
          const fP = frame.participants.find((fP:any) => fP.participantId === p.participantId);
          p.status.items = fP.items;
          p.status.wardsPlaced = fP.wardsPlaced;
          p.status.wardsDestroyed = fP.wardsDestroyed;
          p.status.attackDamage = fP.attackDamage;
          p.status.abilityPower = fP.abilityPower;
          p.status.criticalChance = fP.criticalChance;
          p.status.attackSpeed = fP.attackSpeed;
          p.status.lifeSteal = fP.lifeSteal;
          p.status.armor = fP.armor;
          p.status.magicResistance = fP.magicResistance;
          p.status.tenacity = fP.tenacity;
          return p;
        })

        dispatch({
          type:"HOME_GAME_META_DATA",
          payload: gameMetadata
        })
      }

    })
  }
}

export const getWindowGame = (id: string, date: string, gameMetadata:HomeGameData)=>{
  return(dispatch:any)=>{
    axios.get(`${urlMap.feed}/window/${id}`, {
      params: {
        "hl": "pt-BR",
        "startingTime": date,
      },
      headers: {
        "x-api-key": appKey,
      },
    }).then((response)=>{

      if(response.data){
        const {blueTeamMetadata, redTeamMetadata } = response.data.gameMetadata;

        gameMetadata.blueTeamMetadata.esportsTeamId = blueTeamMetadata.esportsTeamId
        gameMetadata.blueTeamMetadata.participantMetadata = gameMetadata.blueTeamMetadata.participantMetadata.map((p, i)=>{
          p.participantId = blueTeamMetadata.participantMetadata[i].participantId
          p.summonerName = blueTeamMetadata.participantMetadata[i].summonerName
          p.championId = blueTeamMetadata.participantMetadata[i].championId
          p.role = blueTeamMetadata.participantMetadata[i].role
          return p;
        })

        gameMetadata.redTeamMetadata.esportsTeamId = redTeamMetadata.esportsTeamId
        gameMetadata.redTeamMetadata.participantMetadata = gameMetadata.redTeamMetadata.participantMetadata.map((p, i)=>{
          p.participantId = redTeamMetadata.participantMetadata[i].participantId
          p.summonerName = redTeamMetadata.participantMetadata[i].summonerName
          p.championId = redTeamMetadata.participantMetadata[i].championId
          p.role = redTeamMetadata.participantMetadata[i].role
          return p;
        })

        const frame = response.data.frames[response.data.frames.length -1];

        gameMetadata.gameState = frame.gameState

        gameMetadata.blueTeamMetadata.barons = frame.blueTeam.barons
        gameMetadata.blueTeamMetadata.dragons = frame.blueTeam.dragons
        gameMetadata.blueTeamMetadata.inhibitors = frame.blueTeam.inhibitors
        gameMetadata.blueTeamMetadata.totalGold = frame.blueTeam.totalGold
        gameMetadata.blueTeamMetadata.totalKills = frame.blueTeam.totalKills
        gameMetadata.blueTeamMetadata.towers = frame.blueTeam.towers

        gameMetadata.redTeamMetadata.barons = frame.redTeam.barons
        gameMetadata.redTeamMetadata.dragons = frame.redTeam.dragons
        gameMetadata.redTeamMetadata.inhibitors = frame.redTeam.inhibitors
        gameMetadata.redTeamMetadata.totalGold = frame.redTeam.totalGold
        gameMetadata.redTeamMetadata.totalKills = frame.redTeam.totalKills
        gameMetadata.redTeamMetadata.towers = frame.redTeam.towers

        gameMetadata.blueTeamMetadata.participantMetadata = gameMetadata.blueTeamMetadata.participantMetadata.map((p, i)=>{
          const fP = frame.blueTeam.participants.find((fP:any) => fP.participantId === p.participantId);
          p.status.assists = fP.assists;
          p.status.creepScore = fP.creepScore;
          p.status.currentHealth = fP.currentHealth;
          p.status.deaths = fP.deaths;
          p.status.kills = fP.kills;
          p.status.level = fP.level;
          p.status.maxHealth = fP.maxHealth;
          p.status.totalGold = fP.totalGold;
          p.status.participantId = fP.participantId;
          return p;
        })

        gameMetadata.redTeamMetadata.participantMetadata = gameMetadata.redTeamMetadata.participantMetadata.map((p, i)=>{
          const fP = frame.redTeam.participants.find((fP:any) => fP.participantId === p.participantId);
          p.status.assists = fP.assists;
          p.status.creepScore = fP.creepScore;
          p.status.currentHealth = fP.currentHealth;
          p.status.deaths = fP.deaths;
          p.status.kills = fP.kills;
          p.status.level = fP.level;
          p.status.maxHealth = fP.maxHealth;
          p.status.totalGold = fP.totalGold;
          p.status.participantId = fP.participantId;
          return p;
        })

        dispatch({
          type:"HOME_GAME_META_DATA",
          payload: gameMetadata
        })
      }

    })
  }
}