import Player from '../Components/Player';
import '../CSS/Teams.css';
import uuid from 'react-uuid';

export default function Teams(props){
  const info = props.data;
  var length = info.frames.length;
  return(
    <div className='format'>
      <div className='blueside'>
        <div className='teamInfo'>
          <h4 className='infos'>Total Gold: {info.frames[length - 1].blueTeam.totalGold}</h4>
          <h4 className='infos'>Inhibitors: {info.frames[length - 1].blueTeam.inhibitors}</h4>
          <h4 className='infos'>Towers: {info.frames[length - 1].blueTeam.towers}</h4>
          <h4 className='infos'>Barons: {info.frames[length - 1].blueTeam.barons}</h4>
          <h4 className='infos'>Dragons: {info.frames[length - 1].blueTeam.dragons.length}</h4>
        </div>
        {info.gameMetadata.blueTeamMetadata.participantMetadata.map((data,key) =>{
          return <Player key={uuid()} name={data.summonerName} champion={data.championId} participant={info.frames[info.frames.length-1].blueTeam.participants[data.participantId-1]}/>
        })}
      </div>
        
      <div className='redside'>
        <div className='teamInfo'>
          <h4 className='infos'>Total Gold: {info.frames[length-1].redTeam.totalGold}</h4>
          <h4 className='infos'>Inhibitors: {info.frames[length-1].redTeam.inhibitors}</h4>
          <h4 className='infos'>Towers: {info.frames[length-1].redTeam.towers}</h4>
          <h4 className='infos'>Barons: {info.frames[length-1].redTeam.barons}</h4>
          <h4 className='infos'>Dragons: {info.frames[length-1].redTeam.dragons.length}</h4>
        </div>
        
        {info.gameMetadata.redTeamMetadata.participantMetadata.map((data,key) =>{
          return <Player key={uuid()} name={data.summonerName} champion={data.championId} participant={info.frames[info.frames.length-1].redTeam.participants[data.participantId-6]}/>
      })}
      </div>
    </div>
  );
}