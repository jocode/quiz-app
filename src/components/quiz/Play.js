import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import questions from '../../questions.json';
import isEmpty from '../../utils/is_empty.js';

import M from 'materialize-css';
import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';

import classnames from 'classnames';

class Play extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: questions,
      currentQuestion: {},
      nextQuestion: {},
      previusQuestion: {},
      answer: '',
      numberOfQuestion: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      time: {}
    };

    this.interval = null;
  }

  componentDidMount() {
    const { question, currentQuestion, nextQuestion, previusQuestion } = this.state.questions;
    this.displayQuestions(question, currentQuestion, nextQuestion, previusQuestion);
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previusQuestion) => {

    let { currentQuestionIndex } = this.state;

    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previusQuestion = questions[currentQuestionIndex - 1];

      const answer = currentQuestion.answer;

      this.setState({
        currentQuestion,
        nextQuestion,
        previusQuestion,
        numberOfQuestion: questions.length,
        answer,
        previousRandomNumbers: [],
        usedFiftyFifty: false
      }, () => {
        this.showOptions();
        this.handleDisabledButton();
      });

    }
  };

  handleOptionClick = (e) => {
    // console.log(`Options clicked`, e.target.innerHTML);

    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      setTimeout(() => {
        document.getElementById('correct-sound').play();
      }, 300);
      this.correctAnswer();
    } else {
      setTimeout(() => {
        document.getElementById('wrong-sound').play();
      }, 300)
      this.wrongAnswer();
    }
  }

  handleButtonClick = (e) => {
    switch (e.target.id) {

      case 'next-button':
        this.handleNextButtonClick();
        break;

      case 'previus-button':
        this.handlePreviusButtonClick();
        break;

      case 'quit-button':
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }), () => {
        this.displayQuestions(this.state.state, this.state.currentQuestion,
          this.state.nextQuestion, this.state.previusQuestion);
      });
    }
  }

  handlePreviusButtonClick = () => {
    this.playButtonSound();
    if (this.state.previusQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex - 1
      }), () => {
        this.displayQuestions(this.state.state, this.state.currentQuestion,
          this.state.nextQuestion, this.state.previusQuestion);
      });
    }
  }

  handleQuitButtonClick = () => {
    this.playButtonSound();
    if (window.confirm('Are you sure you want to quit?')) {
      this.props.history.push('/');
    }
  };

  playButtonSound = () => {
    document.getElementById('button-sound').play();
  };

  correctAnswer = () => {
    M.toast({
      html: 'Correct Answer',
      classes: 'toast-valid',
      displayLength: 1500
    });

    this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
      //Calback function
      if (this.state.nextQuestion === undefined) {
        this.endGame();
      } else {
        this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previusQuestion);
      }
    });

  }


  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: 'Wrong Answer',
      classes: 'toast-invalid',
      displayLength: 1500
    });

    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
    }), () => {
      //Calback function
      if (this.state.nextQuestion === undefined) {
        this.endGame();
      } else {
        this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previusQuestion);
      }
    });

  }

  showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach(option => {
      option.style.visibility = 'visible';
    });
  }

  handleHints = () => {

    if (this.state.hints > 0) {

      const options = Array.from(document.querySelectorAll('.option'));
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
          indexOfAnswer = index;
        }
      });

      while (true) {
        const randomNumber = Math.round(Math.random() * 3);

        if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {

          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = 'hidden';

              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
              }));
            }

          });
          break;
        }

        if (this.state.previousRandomNumbers.length >= 3) break;

      }
    }

  }

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {

      const options = document.querySelectorAll('.option');
      const randomNumbers = this.state.previousRandomNumbers;
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
          indexOfAnswer = index;
        }
      });

      let count = 0;

      do {
        const randomNumber = Math.round(Math.random() * 3);

        if (randomNumber !== indexOfAnswer) {

          if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);

              if (newRandomNumber !== indexOfAnswer && !randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }

        }
      } while (count < 2);

      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = 'hidden';
        }
      });

      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true,
        previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumbers)
      }));

    }
  }

  startTimer = () => {
    const countDownTime = Date.now() + 3 * 60 * 1000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / (1000));

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState({
          time: {
            minutes: 0,
            seconds: 0
          }
        }, () => {
          console.log("Quiz has ended!");
          this.endGame();
        });
      } else {
        this.setState({
          time: {
            minutes,
            seconds
          }
        })
      }
    }, 1000);
  }

  handleDisabledButton = () => {
    if (this.state.previusQuestion === undefined || this.state.currentQuestionIndex === 0) {
      this.setState({
        previousButtonDisabled: true
      });
    } else {
      this.setState({
        previousButtonDisabled: false
      });
    }

    if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestion) {
      this.setState({
        nextButtonDisabled: true
      });
    } else {
      this.setState({
        nextButtonDisabled: false
      });
    }
  }


  endGame = () => {
    alert('Quiz has ended!');
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestion: state.numberOfQuestion,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswer: state.correctAnswers,
      wrongAnswer: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hints
    }

    console.log(playerStats);
    setTimeout(() => {
      this.props.history.push('/');
    }, 1000)
  }

  render() {

    const {
      currentQuestion,
      currentQuestionIndex,
      numberOfQuestion,
      hints,
      fiftyFifty,
      time
    } = this.state;
    // console.log(currentQuestion);

    return (
      <Fragment>
        <Helmet><title>Quiz Page</title></Helmet>
        <Fragment>
          <audio id="correct-sound" src={correctNotification}></audio>
          <audio id="wrong-sound" src={wrongNotification}></audio>
          <audio id="button-sound" src={buttonSound}></audio>
        </Fragment>
        <div className="question">
          <h2>Quiz Mode</h2>
          <div className="lifeline-container">
            <p>
              <span onClick={this.handleFiftyFifty} className="mdi mdi-set-center mdi-24px lifeline-icon">
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p>
              <span onClick={this.handleHints} className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon">
                <span className="lifelina">{hints}</span>
              </span>
            </p>
          </div>
          <div className="timer-container">
            <p>
              <span className="left">{currentQuestionIndex + 1} of {numberOfQuestion}</span>
              <span className="right">{time.minutes}:{time.seconds}
                <span className="mdi mdi-clock-outline mdi-24px"></span>
              </span>
            </p>
          </div>

          <h5>{currentQuestion.question}</h5>
          <div className="option-container">
            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
          </div>
          <div className="option-container">
            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
          </div>

          <div className="button-container">
            <button id="previus-button"
              className={classnames('', { 'disable': this.state.previousButtonDisabled })}
              onClick={this.handleButtonClick}>
              Previus
              </button>
            <button id="next-button"
              className={classnames('', { 'disable': this.state.nextButtonDisabled })}
              onClick={this.handleButtonClick}>
              Next
              </button>
            <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
          </div>

        </div>
      </Fragment>
    );
  }

}

export default Play;