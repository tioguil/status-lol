import React from "react";
import Container from "@material-ui/core/Container";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import {SchedulerGamePropsTypes} from "./schedulerGameCard.types";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme?: Theme) =>
  createStyles({
    paper: {
      height: 110,
      width: '100%',
      textAlign:"center"
    }
  }),
);

const SchedulerGameCard = (props:SchedulerGamePropsTypes) =>{
  const {event} = props;
  const classes = useStyles();
  const startTimeFormat = moment(event.startTime).utc().format("DD/MM HH:mm");
  return(
    <Paper className={classes.paper}>
      <Tooltip title={`${event.match?.teams[0].name} vs ${event.match?.teams[1].name}`} placement="top">
        <Container>
          <div style={{padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center"}}>
            {`${startTimeFormat}`}
          </div>
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
          <div style={{paddingTop:"0.2rem"}}>
            {event.league.name}
          </div>
        </Container>
      </Tooltip>
    </Paper>
  );
}


export default SchedulerGameCard;