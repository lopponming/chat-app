import React from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import { Link } from 'react-router-dom';
import firebase from './firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.message !== ''){
      const chatRef = firebase.database().ref('general');
      const chat = {
        message: this.state.message,
        user: this.props.user.displayName,
        timestamp: new Date().getTime()
      }
      chatRef.push(chat);
      this.setState({message: ''});
    }
  }

  render() {
    return (
      <div className="App">
        <div className="chat-app-bg"><h1>chat app</h1></div>
        {this.props.user &&
          <div className="allow-chat">
            <Chatbox />
            <form className="message-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              name="message"
              id="message"
              value={this.state.message}
              placeholder="enter a message..."
              onChange={this.onChange} />
            <button>send</button>
            </form>
          </div>
        }
        {!this.props.user &&
          <div className="disallow-chat">
            <p>hallo! ready to go on an adventure?</p>
            <p><Link className="login-btn" to="/login">login</Link> or <Link className="login-btn" to="/register">register</Link> to start chatting !! :D</p>
          </div>
        }
          <div id="circleContainer">
            <div className='myCircle1'></div>
            <div className='myCircle2'></div>
            <div className='myCircle3'></div>
          </div>
          <footer>copyright 2023 miranda klockars</footer>
      </div>
    );
  }
}

export default App;
