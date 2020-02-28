import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import questions from '../../questions.json';
import isEmpty from '../../utils/is_empty.js';

import M from 'materialize-css';
import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';

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
      time: {}
    };
  }

  componentDidMount() {
    const { question, currentQuestion, nextQuestion, previusQuestion } = this.state.questions;
    this.displayQuestions(question, currentQuestion, nextQuestion, previusQuestion);
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
        answer
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

  handleButtonClick = () => {
    this.playButtonSound();
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
      this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previusQuestion);
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
      this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previusQuestion);
    });

  }

  render() {

    const { currentQuestion, currentQuestionIndex, numberOfQuestion } = this.state;
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
              <span className="mdi mdi-set-center mdi-24px lifeline-icon">
                <span className="lifeline">2</span>
              </span>
            </p>
            <p>
              <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon">
                <span className="lifeline">
                  2
                </span>
              </span>
            </p>
          </div>
          <div className="timer-container">
            <p>
              <span className="left">{currentQuestionIndex + 1} of {numberOfQuestion}</span>
              <span className="right">2:15
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
            <button onClick={this.handleButtonClick}>Previus</button>
            <button onClick={this.handleButtonClick}>Next</button>
            <button onClick={this.handleButtonClick}>Quit</button>
          </div>

        </div>
      </Fragment>
    );
  }

}

export default Play;