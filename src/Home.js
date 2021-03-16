import {Component} from 'react';
import Dropdown from 'react-dropdown';
import Teams from './Components/Teams';

import 'react-dropdown/style.css'
import './CSS/Dropdown.css'

class Home extends Component{  
  constructor(props){
    super(props);

    this.state = {
      headers:{'x-api-key':'0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'},
      error:null,
      isLoaded:false,
      idLeague:null,
      idGame:null,
      startingTime:null,
      data:null,
      minutos:null,
      schedules:null,
      schedulesOptions:null,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleLeagueChange = this.handleLeagueChange.bind(this);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
  }
  
  componentDidMount() {
    const headers = {'x-api-key':'0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'};
    fetch('https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=pt-BR',{headers})
      .then(res => res.json())
      .then((result) => {
        const obj =[]

        for(var i = 0; i < result.data.leagues.length;i++){
          obj[i]= {value:result.data.leagues[i].id,label:result.data.leagues[i].name}
        }
        
        this.setState({
          leagues: obj 
        })
      })
  }

  handleLeagueChange(event){
    this.setState({
      idLeague:event.value
    })

    const headers = {'x-api-key':'0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'};

    setTimeout(()=>{
      fetch(`https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=pt-BR&leagueId=${this.state.idLeague}`,{headers})
        .then(res => res.json())
        .then((result) => {
          const objOptions = []

          for(var i = 0,j = 0; i < result.data.schedule.events.length;i++){
            if(result.data.schedule.events[i].state !== 'completed'){
              objOptions[j] ={
                value:result.data.schedule.events[i].match.id,
                label:(result.data.schedule.events[i].match.teams[0].code+" vs "+result.data.schedule.events[i].match.teams[1].code),
                startTime: result.data.schedule.events[i].startTime,
              }
              j = j + 1;  
            };
          }
          
          this.setState({
            schedulesOptions: objOptions
          })
      })
    },10);    
  }

  handleScheduleChange(event){
    var idPartida = event.value;
    
    const headers = {'x-api-key':'0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'};

    setTimeout(()=>{
      fetch(`https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=pt-BR&id=${idPartida}`,{headers})
        .then(res => res.json())
        .then((result) => {
          this.setState({
            idGame: result.data.event.match.games[0].id
          })
      }) 
    },100)
  }

  handleClick(){
    const headers = {'x-api-key':'0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'};

    
    setInterval(()=>{
      var startTime = this.ISODateString(new Date)

      fetch(`https://feed.lolesports.com/livestats/v1/window/${this.state.idGame}?startingTime=${startTime}`,{headers})
      .then(res => res.json())
        .then((result) => {
          this.setState({
            isLoaded:true,
            data: result
          })
        },
        (error) =>{
          this.setState({
            isLoaded:true,
            error
          })
        }
      )
    },10400)
  }

  ISODateString(d) {
    const arredondarSegundos = () =>{
      const segundos = [0,10,20,30,40,50]
      var min = this.state.minutos;

      const menosVinte = (sec) =>{
        switch(sec){
          case 0:
            this.setState({
              minutos: min - 1
            })
            return 4;
          case 1:
            this.setState({
              minutos: min - 1
            })
            return 5;
          case 2:
            return 0;
          case 3:
            return 1;
          case 4:
            return 2;
          case 5:
            return 3;
        }
      }

      return segundos[menosVinte(Math.floor(d.getUTCSeconds()/10))];
    }
    this.setState({
      minutos: d.getUTCMinutes()
    })

    var segundos = arredondarSegundos();


    function pad(n){
      return n < 10 ? '0'+ n : n
    }

    setTimeout(200)

    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(this.state.minutos)+':'
    + pad(segundos)+'Z';
  }

  render(){
    return(
      <div>
        <div>
          <h3>
            ID da partida
          </h3>
          <p>
            {this.state.id}
          </p>
    
          <button onClick={this.handleClick}>
            Confirmar
          </button>
          <div className="dropsdown">
            {this.state.leagues === null ? null: <Dropdown className="leaguesDropdown" options={this.state.leagues} placeholder='Select a League' onChange={this.handleLeagueChange}></Dropdown>}
            {this.state.schedulesOptions === null ? null: <Dropdown className="scheduleDropdown" options={this.state.schedulesOptions} placeholder='Select a Game' onChange={this.handleScheduleChange}></Dropdown>}
          </div>
        </div>
        { this.state.id === '' ? null : this.state.data === null ? null : <p>{this.state.data.frames[this.state.data.frames.length-1].gameState}</p>}

        
        { this.state.id === '' ? null : this.state.data === null ? null : <Teams data={this.state.data}/>}
        <div>

        </div>
      </div>
    );
  }
}

export default Home;

