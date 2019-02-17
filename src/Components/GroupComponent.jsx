import React from 'react';
import './group.css';
import { getRandomNumberWithIn } from '../utils/gameUtil';

class GroupComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 0,
      gameFinishTime: 5,
      timerCount: null,
      winner: -1
    }
    this.handleGameResults = this.handleGameResults.bind(this);
    this.handleGamePlay = this.handleGamePlay.bind(this);
  }
  componentDidMount() {
    this.handleGamePlay(this.props.gameStart);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.gameStart !== nextProps.gameStart) {
      this.handleGamePlay(nextProps.gameStart);
    }
  }
  componentWillMount() {
    clearInterval(this.state.timerCount);
  }
  handleGamePlay(gameStart) {
    const gameFinishTime = getRandomNumberWithIn(5, 10);
    const timerCount = gameStart && setInterval(() => {
      if (this.state.timer < 10 && this.state.timer <= gameFinishTime) {
        this.setState({
          timer: this.state.timer + 1
        });
      } else {
        clearInterval(timerCount);
        this.handleGameResults();
      }
    }, 1000);
    this.setState({
      gameFinishTime,
      timerCount
    });
  }
  handleGameResults() {
    const winner = this.props.data.length === 1 ? 0 : Math.round(Math.random());
    const timerCount = clearInterval(this.state.timerCount);
    this.props.handleGameResults(this.props.data[winner], this.props.matchId);
    this.setState({
      winner,
      timerCount,
    })
  }
  render() {
    return (
      <div className="group">
        <div className="group__left">
          <div className={`${this.state.winner === 0 ? 'win' : ''}`}>
            {this.props.data[0].teamName}
          </div>
          {this.props.data[1] && <div className="vs" >
            Vs
          </div>}
          {this.props.data[1] && <div className={`${this.state.winner === 1 ? 'win' : ''}`}>
            {this.props.data[1].teamName}
          </div>}
        </div>
        <div className="group__right">
          <div>
            {<br />}
          </div>
          {this.props.data[1] && <div className="counter">
            <b>
              {this.state.timer}
            </b>
          </div>}
          <div>
            {<br />}
          </div>
        </div>
      </div>
    )
  }
}

export default GroupComponent;