import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

class QuizSummary extends Component {

  //Cash the props

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestion: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswer: 0,
      wrongAnswer: 0,
      fiftyFiftyUsed: 0,
      hintsUsed: 0
    };

  }

  componentDidMount() {
    const { state } = this.props.location;
    // console.log({ state });
    if (state !== undefined) {
      this.setState({
        ...state,
        score: (state.score / state.numberOfAnsweredQuestions) * 100
      });
    }
  }

  render() {
    // console.log(this.state);
    const { score } = this.state;
    let stats, remark;

    if (score <= 30) {
      remark = 'You need more practice';
    } else if (score > 30 && score <= 50) {
      remark = 'Better luck next time';
    } else if (score > 50 && score <= 70) {
      remark = 'Excellent, you can do better!';
    } else if (score > 71 && score <= 84) {
      remark = 'You did great!';
    } else {
      remark = 'You\'re absolute genius';
    }

    if (this.props.location.state !== undefined) {
      stats = (
        <Fragment>
          <div style={{ textAlign: 'center' }}>
            <span className="mdi mdi-check-circle-outline success-icon"></span>
          </div>
          <h1>Quiz has ended</h1>
          <div className="container stats">
            <h4>{remark}</h4>
            <h2>You Score: {this.state.score.toFixed(0)}&#37;</h2>

            <span className="stat left">Total number of question: </span>
            <span className="right">{this.state.numberOfQuestion}</span><br />

            <span className="stat left">Total number of attemped question: </span>
            <span className="right">{this.state.numberOfAnsweredQuestions}</span><br />

            <span className="stat left">Total number of Correct Answer: </span>
            <span className="right">{this.state.correctAnswer}</span><br />

            <span className="stat left">Total number of wrong Answer: </span>
            <span className="right">{this.state.wrongAnswer}</span><br />

            <span className="stat left">Hints used: </span>
            <span className="right">{this.state.hintsUsed}</span><br />

            <span className="stat left">50-50 Used:: </span>
            <span className="right">{this.state.fiftyFiftyUsed}</span><br />
          </div>
          <section>
            <ul>
              <li>
                <Link to="/">Back to Home</Link>
              </li>
              <li>
                <Link to="/play/quiz">Play Again</Link>
              </li>
            </ul>
          </section>
        </Fragment>
      );

    } else {
      stats = (
        <section>
          <h1 className="no-stats">No Statistics Available</h1>
          <ul>
            <li>
              <Link to="/">Back to Home</Link>
            </li>
            <li>
              <Link to="/play/quiz">Take a Quiz</Link>
            </li>
          </ul>
        </section>
      );
    }

    return (
      <Fragment>
        <Helmet><title>Quiz App - Summary</title></Helmet>
        <div className="quiz-summary">
          {stats}
        </div>
      </Fragment>
    );
  }
}

export default QuizSummary;