import React, { Component } from "react";

import GamePanel from "./GamePanel";
import GameScreen from "./GameScreen";
import GameItem from "./GameItem";
const CODES_MATCH_QTY = 8;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codes: this._createCodes(),
      moves: props.moves,
      time: props.time,
      firstClickIndex: null,
      matchesQty: 0
    };
  }
  render() {
    return (
      <div>
        <GameScreen>
          <GamePanel
            moves={this.state.moves}
            time={this.state.time}
          />
          {this.state.codes.map((item, index) => {
            return (
              <GameItem onClick={this._onClick.bind(this, index)}>
                {String.fromCodePoint(item.isOpen ? item.code : 9775)}
              </GameItem>
            );
          })}
        </GameScreen>
      </div>
    );
  }


  _resetGame() {
    this.setState({
      codes: this._createCodes(),
      moves: this.props.moves,
      time: this.props.time,
      level: this.props.level,
      firstClickIndex: null,
      matchesQty: 0
    });
  }

  // define matches on click
  _onClick(index) {
    let codes = Array.from(this.state.codes);
    let matchesQty = this.state.matchesQty;
    let moves = this.state.moves;

    if (codes[index].isOpen) {
      return;
    }
    codes[index].isOpen = true;
    let firstClickIndex = this.state.firstClickIndex;
    if (firstClickIndex === null) {
      firstClickIndex = index;
    } else {
      if (codes[firstClickIndex].code !== codes[index].code) {
        setTimeout(this._closeCodes.bind(this, firstClickIndex, index), 500);
      } else {
        matchesQty++;
      }
      firstClickIndex = null;
      moves--;
    }
    this.setState({
      codes: codes,
      firstClickIndex: firstClickIndex,
      matchesQty: matchesQty,
      moves: moves
    });

    if (matchesQty === CODES_MATCH_QTY) {
      setTimeout(function(){
        this.handleGameComplete();
      }.bind(this),1000);
    } else if (moves === 0) {
      setTimeout(function(){
        this.handleMovesOut();
      }.bind(this),1000);
    }
  }

  timer(){
    console.log('tick',this.state.time);
    let time = this.state.time;
    time -=1;
    this.setState({
      time:time
    });
    if(time===0){
      this.handleTimeOut();
    }
  }
  componentDidMount() {
      this.timerID = setInterval(
        function() {
          this.timer();
        }.bind(this),
        1000
      );
    }


  handleMovesOut() {
    alert("Ходы закончились. Вы проиграли.");
    this._resetGame();
  }

  handleTimeOut() {
    alert("Время вышло. Вы проиграли.");
    this._resetGame();
  }

  handleGameComplete() {
    alert("Победа!");
    this._resetGame();
  }

  _closeCodes(index1, index2) {
    let codes = Array.from(this.state.codes);
    codes[index1].isOpen = false;
    codes[index2].isOpen = false;
    this.setState({ codes: codes });
  }

  // return array with emoticons codes
  // array contents objects  {code:number, isOpen:boolean}
  _createCodes() {
    let codesArr = [];

    // create uniqe codes
    // Emoticons decimal codes range 128512-128591
    // https://websitebuilders.com/tools/html-codes/emoticons/
    for (let i = 0; i < CODES_MATCH_QTY; i++) {
      let newCode;
      do {
        newCode = 128500 + Math.floor(Math.random() * 75) + 12;
      } while (!(codesArr.indexOf(newCode) < 0));
      codesArr.push(newCode);
    }

    // dublicate codes for creating matches of codes
    codesArr = [...codesArr, ...codesArr];
    // shuffle codes
    codesArr = this._shuffleArr(codesArr);

    // fill array with objects {code,isOpen}
    codesArr = Array.from(codesArr, value => {
      return {
        code: value,
        isOpen: false
      };
    });

    return codesArr;
  }

  //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  _shuffleArr(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}

export default Game;
