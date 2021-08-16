import {ParticipantsPropsTypes} from "./participants.types";
import {reducerActionType} from "../../reducer/reducer.type";

const INITIAL_STATE:ParticipantsPropsTypes = {
  participants:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action:reducerActionType) => {
  switch (action.type) {
    case 'PARTICIPANTS_LIST':
      return {...state, participants: action.payload};
    default:
      return state;
  }
}