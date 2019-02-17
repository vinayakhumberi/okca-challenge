import React, { Component } from 'react';
import './App.css';
import { randomizeTeams, groupTeamsInTwo } from './utils/gameUtil'
import GroupComponent from './Components/GroupComponent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      teams: [randomizeTeams()],
      groups: [],
      quaterFinals: [ false, false, false, false ],
      timer: null,
    };
    this.handleGameResults = this.handleGameResults.bind(this);
    this.handleHigherGames = this.handleHigherGames.bind(this);
  }
  componentDidMount() {
    this.setState({
      groups: [groupTeamsInTwo(Object.values(this.state.teams[0]))]
    })
  }
  handleGameResults(winner, matchId) {
    let teams = this.state.teams;
    if (!this.state.teams[this.state.groups.length]) {
      teams.push({[matchId]: winner })
    } else {
      const id = this.state.teams.length - 1;
      teams[id][matchId] = winner;
      if ((Object.keys(teams[id]).length === this.state.groups[id - 1].length) && Object.keys(teams[id]).length !== 1) {
        const groups = this.state.groups;
        groups.push(groupTeamsInTwo(Object.values(this.state.teams[id])))
        this.setState({
          groups,
        });
        if (Object.keys(this.state.teams[id]).length <= 8) {
          this.handleHigherGames();
        }
      }
    }
    this.setState({
      teams,
    });
  }
  handleHigherGames() {
    const timer = setInterval(() => {
      let quaterFinals = [true, false, false, false];
      if (this.state.quaterFinals[0]) {
        quaterFinals = [false, true, false, false];
      } else if (this.state.quaterFinals[1]) {
        quaterFinals = [false, false, true, false];
      } else if (this.state.quaterFinals[2]) {
        quaterFinals = [false, false, false, true];
        clearInterval(timer);
      } else {
        quaterFinals = [false, false, false, false];
      }
      this.setState({
        quaterFinals,
        timer
      });
    }, 10000);

    this.setState({
      quaterFinals: [true, false, false, false],
      timer
    });
  }
  render() {
    const latestGroup = this.state.groups.length - 1;
    const teams = this.state.groups.map((batch, loopGroup) => {
      return <div className="col">{Object.keys(batch).map((id, index) => {
        return <GroupComponent data={batch[id]} handleGameResults={this.handleGameResults} matchId={index} gameStart={(Object.keys(batch).length <= 4 && latestGroup === loopGroup && this.state.quaterFinals[index]) || (Object.keys(batch).length > 4)} />
      })}</div>
    });
    return (
      <div className="App">
        {teams}
      </div>
    );
  }
}

export default App;
