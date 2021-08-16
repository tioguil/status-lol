import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {TableRow} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from '@material-ui/core/Paper';
import {ParticipantsTypes} from "./participants.types";
import './participants.css';

const Participants = (props:{reverse:boolean, participants:ParticipantsTypes[]})=>{
  const {reverse, participants} = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          {getHeader(reverse)}
        </TableHead>
        <TableBody>
          {participants.map((row, index) => (
            <Row key={`lines-${index}`} row={row} reverse={reverse} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Participants;


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  },
});

function Row(props: { row: ParticipantsTypes, reverse:boolean }) {
  const { row, reverse } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} onClick={() => setOpen(!open)}>
        {getBody(reverse, row)}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={`ide2-`}>
                    <TableCell component="th" scope="row">
                      {`1010dsa`}
                    </TableCell>
                    <TableCell>{`1010dsa`}</TableCell>
                    <TableCell align="right">{`1010dsa`}</TableCell>
                    <TableCell align="right">
                      {`1010dsa`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const getHeader = (reverse:boolean) =>{

  if(reverse)
    return (
      <TableRow>
        <TableCell align="center"/>
        <TableCell align="center">Life</TableCell>
        <TableCell align="center">Farm</TableCell>
        <TableCell align="center">frag</TableCell>
        <TableCell align="center">Gold</TableCell>
        <TableCell align="center">Itens</TableCell>
      </TableRow>
    );

  return(
    <TableRow>
      <TableCell align="center">Itens</TableCell>
      <TableCell align="center">Gold</TableCell>
      <TableCell align="center">frag</TableCell>
      <TableCell align="center">Farm</TableCell>
      <TableCell align="center">Life</TableCell>
      <TableCell align="center"/>
    </TableRow>
  );
}


const getBody = (reverse:boolean, row:ParticipantsTypes)=>{

  if(reverse)
    return(
      <>
        <TableCell align="center">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${row.championId}.png`}
            width={24}
            alt={`champion-${row.championId}`}
          />
        </TableCell>
        <TableCell align="center">{`${row.status.currentHealth}/${row.status.maxHealth}`}</TableCell>
        <TableCell align="center">{row.status.creepScore}</TableCell>
        <TableCell align="center">{`${row.status.kills}/${row.status.deaths}/${row.status.assists}`}</TableCell>
        <TableCell align="left">{row.status.totalGold}</TableCell>
        {buildItens(row)}
      </>
    );

  return(
    <>
      {buildItens(row)}
      <TableCell align="left">{row.status.totalGold}</TableCell>
      <TableCell align="center">{`${row.status.kills}/${row.status.deaths}/${row.status.assists}`}</TableCell>
      <TableCell align="center">{row.status.creepScore}</TableCell>
      <TableCell align="center">{`${row.status.currentHealth}/${row.status.maxHealth}`}</TableCell>
      <TableCell align="center">
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${row.championId}.png`}
          width={24}
          alt={`champion-${row.championId}`}
        />
      </TableCell>
    </>
  );
}


const buildItens = (row:ParticipantsTypes)=>{
  return(
    <TableCell align="left" style={{display: "inline-flex"}}>
      {
        [...Array(7)].map((x, i) => {

          if(!row.status.items[i]){
            return (
                <div style={{width:18, height:18}}/>
             )
          }

          return(
            <div style={{padding:1}}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/11.5.1/img/item/${row.status.items[i]}.png`}
                width={18}
                alt={`item-${i}`}
              />
            </div>
          );
        })
      }
    </TableCell>
  );
}