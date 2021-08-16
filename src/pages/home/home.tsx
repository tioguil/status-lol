import React from "react";
import NavBar from "../../components/NavBar";
import Grid from '@material-ui/core/Grid';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {HomePropsTypes} from "./home.types";
import Participants from "../../components/participants";
import {getFrames, setIntervalId} from "./home.action";

class Home extends React.Component<HomePropsTypes, any> {

  componentDidMount() {
    if(this.props.home.currentEvent){
      this.props.getFrames(this.props.home.currentEvent);
    }
  }

  render() {
    return(
      <div>
        <NavBar/>
        <div style={{margin:".5rem"}}>
          <Grid container spacing={1}>
            <Grid item md={8} >
              <Grid container>
                <Grid item md={12}>
                  <div style={{textAlign:"center"}}>
                    {this.props.home.gameMetadata.gameState}
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item md={6} >
                  <Participants reverse={false} participants={this.props.home.gameMetadata.blueTeamMetadata.participantMetadata}/>
                </Grid>
                <Grid item md={6} >
                  <Participants reverse={true} participants={this.props.home.gameMetadata.redTeamMetadata.participantMetadata}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} >
              <iframe
                src={`https://player.twitch.tv/?channel=${this.props.home.currentEvent?.streams[0].parameter}&parent=localhost`}
                height="270px"
                width="100%"
              >
              </iframe>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state:any) => ({home:state.home});
const mapDispatchToProps = (dispatch:any) => bindActionCreators(
  {getFrames:getFrames, setIntervalId:setIntervalId}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);