import React from 'react';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <p>Hello {this.props.name}!</p>
                <p>{this.props.name} doesn't know what's happening.</p>
                <p>All of this is pretty cool and new to {this.props.name}.</p>
            </div>
        );
    }
}
export default Hello;