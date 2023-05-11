import React from 'react';
import './Chatbox.css';
import firebase from '../firebase';


class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        }
        this.chatListRef = React.createRef();
    }
    
    componentDidMount(){
        const chatRef = firebase.database().ref('general');
        chatRef.on('value', snapshot => {
            const getChats = snapshot.val();
            let ascChats = [];
            for(let chat in getChats){
                if(getChats[chat].message !== ''){
                    ascChats.push({
                        id: chat,
                        message: getChats[chat].message,
                        user: getChats[chat].user,
                        date: getChats[chat].timestamp
                    });
                }
            }
            const chats = ascChats;
            this.setState({chats}, () => {
                this.scrollToBottom();
            });
        });
    }

    scrollToBottom = () => {
        window.requestAnimationFrame(() => {
          if (this.chatListRef.current) {
            this.chatListRef.current.lastChild.scrollIntoView();
          }
        });
    };

    addChat = (e) => {
        e.preventDefault();
        const chatRef = firebase.database().ref('general');
        const chat = {
          message: this.refs.message.value,
          user: this.props.user.displayName,
          timestamp: Date.now()
        };
        chatRef.push(chat);
        this.refs.message.value = '';
        this.scrollToBottom();
    };

    render() {
        return(
            <div className="chatbox">
                <ul ref={this.chatListRef} id="chat-list" className="chat-list">
                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        return(
                            <li key={chat.id}>
                                <em>{postDate.getDate() + '/' + (postDate.getMonth()+1)}</em>
                                <strong>{chat.user}:</strong>
                                <p>{chat.message}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Chatbox;