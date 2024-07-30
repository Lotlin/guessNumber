import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Ввведите число',
    userNumber: '',
    randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    count: 0,
    isGuessed: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Ввведите число',
          count: state.isGuessed ? 0 : state.count - 1,
          isGuessed: false,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угaдали, это ${state.userNumber}, попыток ${state.count}.`,
        isGuessed: true,
      };
    });

    this.setState({
      userNumber: '',
    });
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleNewGame = e => {
    this.setState({
      count: 0,
      result: 'Ввведите число',
      isGuessed: false,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form
          className={style.form}
          onSubmit={this.handleSubmit} >

          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input} type='number' id='user_number'
            onInput={this.handleChange} value={this.state.userNumber}/>

          <button className={style.btn}>Угадать</button>
          {
            this.state.isGuessed &&
              <button
                className={style.btn}
                onClick={this.handleNewGame}
              >Сыграть ещё
              </button>
          }
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
