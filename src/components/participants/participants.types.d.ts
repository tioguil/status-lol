
export type ParticipantsTypes = {
  "participantId": number,
  "summonerName": string,
  "championId": string,
  "role": string,
  "status":{
    "participantId": number,
    "totalGold": number,
    "level": number,
    "kills": number,
    "deaths": number,
    "assists": number,
    "creepScore": number,
    "currentHealth": number,
    "maxHealth": number,
    "items":number[],
    "wardsPlaced": number,
    "wardsDestroyed": number,
    "attackDamage": number,
    "abilityPower": number,
    "criticalChance": number,
    "attackSpeed": number,
    "lifeSteal": number,
    "armor": number,
    "magicResistance": number,
    "tenacity": number,
  }
}

export type ParticipantsPropsTypes = {
  participants:ParticipantsTypes[]
}