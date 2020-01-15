import React, {Component} from 'react'
import {Button, DropdownButton, DropdownItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class Header extends Component {

    state = {
        driverListAvailable: false,
    };

    handleClick(e) {
        if (!this.state.driverListAvailable) {

            this.props.setDrivers().then(() => {
                this.props.setLoadedStatus();
            });
            
            this.setState({driverListAvailable: true});
            if (!this.props.filtered) {
                this.disableGetDriversButton();
            }
        }
    }

    disableGetDriversButton() {
        this.refs.btn.setAttribute("disabled", "disabled")
    }

    enableGetDriversButton() {
        this.setState({driverListAvailable: false});
        this.refs.btn.removeAttribute("disabled")
    }

    render() {
        return (
            <header style={headerStyle}>
                <h2>Driver-Heartbeat Illustration <span></span><span></span>
                    <Button variant="success" ref="btn" style={btnStyle} onClick={this.handleClick.bind(this)}>Get Driver List!</Button>
                </h2>
                <Link to='/' style={linkStyle}>Driver List</Link>{' '} | {' '}<Link to='/map' style={linkStyle}>Map</Link>
            </header>
        )
    }

}

const headerStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center'
};

const btnStyle = {
    padding: '5px 10px',
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

export default Header