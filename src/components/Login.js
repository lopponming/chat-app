import React from 'react';
import './Login.css';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
        };
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({error});
        });
    }
    render() {
        const {email, password, error} = this.state;
        return (
            <div className="auth-container">
                <div className="chat-app-bg"><h1>login</h1></div>
                <p>login to access your account</p>
                {error && <p className="error-message">{error.message}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" id="email" value={email} onChange={this.handleChange}></input>
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={this.handleChange}
                        >
                    </input>
                    <button className="submit">login</button>
                    <p>don't have an account? <Link className="login-btn" to="/register">register</Link></p>

                </form>
            </div>
        );
    }
}

export default Login;