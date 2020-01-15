import React, {Component} from 'react'
import {DropdownButton, DropdownItem} from "react-bootstrap"

class Filters extends Component {
    state = {
        filterBy: "None",
        driverID: '',
        NumOfDrivers: 0
    };

    handleFilteringByModel(e) {
        this.setState({filterBy: e.target.innerText});
        switch (e.target.innerText) {
            case 'Tuk':
                this.props.filterDriversByVehicleModel('Tuk');
                break;
            case "Mini":
                this.props.filterDriversByVehicleModel('Mini');
                break;
            case "Car":
                this.props.filterDriversByVehicleModel('Car');
                break;
            case "VIP":
                this.props.filterDriversByVehicleModel('VIP');
                break;
            case "Jeep":
                this.props.filterDriversByVehicleModel('Jeep');
                break;
            case "Van":
                this.props.filterDriversByVehicleModel('Van');
                break;
            case "AID":
                this.props.filterDriversByVehicleModel('AID');
                break;
            case "SOS":
                this.props.filterDriversByVehicleModel('SOS');
                break;
            case "Air Lift":
                this.props.filterDriversByVehicleModel('Air Lift');
                break;
            case "Nano":
                this.props.filterDriversByVehicleModel('Nano');
                break;
            case "Vesak":
                this.props.filterDriversByVehicleModel('Vesak');
                break;
            case "Bike":
                this.props.filterDriversByVehicleModel('Bike');
                break;
            case "Budget":
                this.props.filterDriversByVehicleModel('Budget');
                break;
            case "Minivan":
                this.props.filterDriversByVehicleModel('Minivan');
                break;
            case "Light Open":
                this.props.filterDriversByVehicleModel('Light Open');
                break;
            case "Light":
                this.props.filterDriversByVehicleModel('Light');
                break;
            default:
                this.props.getInitialDrivers();
        }
    }

    handleOnChange(e) {
        this.setState({driverID: e.target.value});
        this.props.filterDriversByDriverID(e.target.value)
    }

    handleOnClickFilter(e) {
        this.props.setShowNavStatus()
    }

    render() {
        return (
            <header style={headerStyle}>
                <h5>
                    <button className="menuButton" onClick={this.handleOnClickFilter.bind(this)}><span>Menu</span></button>
                    Filter By : <span></span>
                    <DropdownButton size="sm" id="dropdown-filterby" title={this.state.filterBy} variant="white" style={filterItemStyle}>
                        <DropdownItem onClick={this.handleFilteringByModel.bind(this)}>None</DropdownItem>
                        <DropdownItem onClick={this.handleFilteringByModel.bind(this)}>Tuk</DropdownItem>
                        <DropdownItem onClick={this.handleFilteringByModel.bind(this)}>Mini</DropdownItem>
                        <DropdownItem onClick={this.handleFilteringByModel.bind(this)}>Nano</DropdownItem>
                        <DropdownItem onClick={this.handleFilteringByModel.bind(this)}>Car</DropdownItem>
                    </DropdownButton>
                    <span>&nbsp;&nbsp;</span>
                    <p style={filterItemStyle}> Driver ID : </p>
                    <input
                        type='text'
                        placeholder='search by driver id...'
                        name='driverID'
                        onChange={this.handleOnChange.bind(this)}
                        value={this.state.driverID}
                        style={textStyle}
                    />
                    <span>&nbsp;&nbsp;</span> {'    '} <span>&nbsp;&nbsp;</span>
                    <p style={{display: 'inline-block'}}>
                        {this.props.drivers.length} results
                    </p>
                </h5>
            </header>
        )
    }
}

const headerStyle = {
    textAlign: "center",
    padding: '5px 10px 0px 2px',
    fontWeight: 'bold',
    position: 'relative',
    bottom: '-3px',
    // backgroundColor: '#D7D7D7'
};

const filterItemStyle = {
    display: 'inline-block',
    padding: '0px 10px 0px 0px',
    fontFamily: "Arial",
};

const textStyle = {
    padding: '2px 10px',
    margin: '8px 0',
    display: 'inline-block',
    borderRadius: '4px',
    width: '200px'
};

export default Filters