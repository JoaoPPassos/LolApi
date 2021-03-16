import '../CSS/Player.css';

export default function Player(props){
  var part = props.participant;
  var kills = part.kills ;
  var assists = part.assists;
  var deaths = part.deaths;
  var totalGold = part.totalGold;
  var creep = part.creepScore;
  return(
    <div className='playerArea'>
      <div className='playerInfos'>
        <h3>{props.name}</h3>
        <h4>{props.champion}</h4>
      </div>
      <div className='ingameInfos'>
        <p className='kda'>  {kills} / {deaths} / {assists}</p>
      </div>
      <p className='gold'>gold: {totalGold}</p>
      <p className='creep'>creep: {creep}</p>
    </div>
  );
}