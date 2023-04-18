import React from 'react';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <p>hello {this.props.name}!</p>
                <p>{this.props.name} doesn't know what's happening.</p>
                <p>all of this is pretty cool and new to {this.props.name}.</p>
                <p>she might soon be {this.props.age} years old.</p>
            </div>
        );
    }
}
export default Hello;