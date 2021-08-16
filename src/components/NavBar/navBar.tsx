import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LiveGameCard from "./components/liveGameCard";
import Divider from '@material-ui/core/Divider';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getLive, setDrawerState, getSchedule, setCurrentEvent} from "./navBar.actions";
import {LiveGameCardTypes} from "./components/liveGameCard/liveGameCard.types";
import {navBarPropsTypes} from "./navBar.types";
import SchedulerGameCard from "./components/schedulerGameCard";

class NavBar extends React.Component<navBarPropsTypes, any>{

  componentDidMount() {
    this.props.getLive();
    this.props.getSchedule();
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="menu" onClick={()=> this.props.setDrawerState(true)}>
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6">
              Status LOL
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer onOpen={()=> this.props.setDrawerState(true)} open={this.props.navBar.drawerState} onClose={()=> this.props.setDrawerState(false)}>
          <div>
            <div style={{padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", minWidth:218}}>
              <span style={{paddingRight:".5rem"}}><LiveTvIcon /></span> Ao vivo
            </div>
            <Divider />

            {this.props.navBar.liveGames.length === 0 && <div style={{textAlign:"center", padding: "0.5rem",}}>Nenhuma transmissão</div>}

            <List>
              {this.props.navBar.liveGames.map((g:LiveGameCardTypes, i:number)=>{
                return(
                  <ListItem button key={`item-${i}`}>
                    <LiveGameCard event={g} setCurrentEvent={this.props.setCurrentEvent} />
                  </ListItem>
                );
              })}
            </List>
            <div style={{padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", minWidth:218}}>
              <span style={{paddingRight:".5rem"}}><ScheduleIcon /></span> Schedule
            </div>
            <Divider />
            <List>
              {this.props.navBar.scheduleGames.map((event, i:number)=>{
                return(
                  <ListItem button key={`item-${i}`}>
                    <SchedulerGameCard event={event}/>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

const mapStateToProps = (state:any) => ({navBar:state.navBar});
const mapDispatchToProps = (dispatch:any) => bindActionCreators(
  {getLive:getLive, setDrawerState:setDrawerState, getSchedule:getSchedule,
    setCurrentEvent:setCurrentEvent}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);