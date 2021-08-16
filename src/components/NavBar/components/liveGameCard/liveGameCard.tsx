import React from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Tooltip from '@material-ui/core/Tooltip';
import {LiveGamePropsTypes, LiveGameCardTypes} from "./liveGameCard.types";

const useStyles = makeStyles((theme?: Theme) =>
  createStyles({
    paper: {
      height: 110,
      width: '100%',
      textAlign:"center"
    }
  }),
);

const LiveGameCard = (props:LiveGamePropsTypes)=>{
  const {event, setCurrentEvent} = props;
  const classes = useStyles();

  return(
    <Paper className={classes.paper} onClick={()=> setCurrentEvent(event)}>
      <Container>
        <div style={{padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <FiberManualRecordIcon color={"error"} fontSize={"small"}/> Ao vivo
        </div>
        {typeEvent(event)}
        <div style={{paddingTop:"0.2rem"}}>
          {event.league.name}
        </div>
      </Container>
    </Paper>
  );
}

const typeEvent = (event:LiveGameCardTypes)=>{

  if(event.type === "match"){
    return(
      <Tooltip title={`${event.match?.teams[0].name} vs ${event.match?.teams[1].name}`} placement="top">
        <Grid container spacing={2}>
          <Grid item md={4}>
            <img src={event.match?.teams[0].image} alt={`team-${event.match?.teams[0].name}`} width={"36px"}/>
          </Grid>
          <Grid item md={4}>
            <div style={{padding:'.5rem'}}>
              VS
            </div>
          </Grid>
          <Grid item md={4}>
            <img src={event.match?.teams[1].image} alt={`team-${event.match?.teams[1].name}`} width={"36px"}/>
          </Grid>
        </Grid>
      </Tooltip>
    );
  }

  return (
    <Grid container>
      <Grid item md={12}>
        <div>
          <img src={event.league.image} alt={`league-${event.league.name}`} width={"36px"}/>
        </div>
      </Grid>
    </Grid>
  );

}

export default LiveGameCard;