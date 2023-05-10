import React from 'react';
import './Register.css'
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const {email, username, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({displayName: username}).then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            })
        })
        .catch(error => {
            this.setState({error});
        })
    }
    render() {
        const {email, username, password, error} = this.state;
        return (
            <div className="auth-container">
                <h1>register your account here</h1>
                {error && <p className="error-message">{error.message}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" id="username" value={username} onChange={this.handleChange}></input>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" id="email" value={email} onChange={this.handleChange}></input>
                    <label htmlFor="password">choose a password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={this.handleChange}
                        >
                    </input>
                    <button className="submit">get started</button>
                    <p>already have an account? <Link className="login-btn" to="/login">login</Link></p>
                </form>
            </div>
        );
    }
}

export default Register;