import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/layout/Header'
import DriverTable from './components/driver/Table'
import Map from './components/map/Map'
import FilterBar from './components/layout/Filters'
import SideNav from 'react-simple-sidenav';
import ToggleButton, {X, Check} from 'react-toggle-button'

class App extends Component {
  state = {
    initialDrivers: [],
    drivers: [],
    filtered: false,
    allDataLoaded: false,
    hour: 0,
    min: 0,
    sideMenu: {
        showNav: false,
        shiftStatusClicked: false,
        // shiftStatusOn: false,
    },
    shiftStatusOn: false,
  };

  setDrivers() {
    return new Promise(resolve => {
       this.getDrivers().then(() => {
           resolve();
       });
    });
  }

  getDrivers() {
        //   axios.get("/locations.json").then(res => this.setState({drivers: res.data.data}))

      //todo: the following url should be changed to get driver data
      return new Promise(resolve => {
         axios.get('http://localhost:9000/drivers/current').then(res => {
            console.log('response : ', res.data)
            this.setState({drivers: res.data.drivers, initialDrivers: res.data.drivers});
            resolve();
         });
      });
  }

  getInitialDrivers() {
    this.setState({drivers: [...this.state.initialDrivers]});
    // this.refs.childHeader.disableGetDriversButton();
  }

  getPastDrivers = (hour, min) => {
      let currentTime = new Date();
      if ((currentTime.getHours() < hour) || (currentTime.getHours() === hour && currentTime.getMinutes() < min)) {
        console.log('future time')
      }
      if ((this.state.hour === hour && this.state.min == min) || (currentTime.getHours() === hour && currentTime.getMinutes() == min)) {
        console.log('should not update')
      } else if (this.state.allDataLoaded) {
          this.setState({hour: hour, min: min});
          axios.get('http://localhost:9000/drivers/past').then(res => {
              this.setState({drivers: [...res.data.drivers]});
              console.log('drivers : ', res.data.drivers);
          })
      }
  };

  setShowNavStatus = () => {
    let sideMenuState = {...this.state.sideMenu};
    sideMenuState.showNav = true;
    this.setState({showNav: sideMenuState});
  };

  setLoadedStatus() {
    this.setState({allDataLoaded: true})
  };

  handleShiftToggle = () => {
    // let sideMenu = {...this.state.sideMenu};
    // sideMenu.shiftStatusOn = !this.state.sideMenu.shiftStatusOn;
    // this.setState({shiftStatusOn: sideMenu});
    // console.log('side menu status : ', this.state.sideMenu)

    const shiftStatusOn = this.state.shiftStatusOn;
    this.setState({shiftStatusOn: shiftStatusOn});
    console.log('status : ', this.state.shiftStatusOn)
  };

  filterDriversByVehicleModel(vModel) {
      this.setState({drivers: [...this.state.initialDrivers.filter(driver => driver.vehicle_model === vModel)]});
      this.setState({filtered: true});
      this.refs.childHeader.enableGetDriversButton();
  };

  filterDriversByDriverID(ID) {
      let strID = ID.toString();
      this.setState({drivers: [...this.state.drivers.filter(driver => (driver.driver_id.toString()).includes(strID))]});
      this.setState({filtered: true});
      this.refs.childHeader.enableGetDriversButton();
  };

  renderDriverTable = () => {
      return (
          <DriverTable
              drivers={this.state.drivers}
              allDataLoaded={this.state.allDataLoaded}
          />
      )
  };

  render() {
    return (
        <Router>
            <div className="App" style={windowStyle}>
                <Header setDrivers={this.setDrivers.bind(this)} filtered={this.state.filtered} ref="childHeader" setLoadedStatus={this.setLoadedStatus.bind(this)}/>
                <FilterBar
                    drivers={this.state.drivers}
                    getDrivers={this.getDrivers.bind(this)}
                    getInitialDrivers={this.getInitialDrivers.bind(this)}
                    filterDriversByVehicleModel={this.filterDriversByVehicleModel.bind(this)}
                    filterDriversByDriverID={this.filterDriversByDriverID.bind(this)}
                    setShowNavStatus={this.setShowNavStatus}
                    ref="childFilter"
                />
                <div>
                    <SideNav
                        showNav        =  {this.state.showNav}
                        onHideNav      =  {() => this.setState({showNav: false})}
                        title          =  "Filters"
                        // items          =  {['Status', 'Shift Status', 'Connectivity', 'Rank']}

                        items          =  {[
                            <div className={'dropdown'}>
                                <button onClick={handleListDropDown.bind(this)} className="listButton default">Shift Status</button>
                                {/*<div id="shiftStatusDropdown" className="dropdown-content">*/}
                                {/*    <a href="#">Link 1</a>*/}
                                {/*    <a href="#">Link 2</a>*/}
                                {/*    <a href="#">Link 3</a>*/}
                                {/*</div>*/}

                                {this.state.shiftStatusClicked && (
                                    <div>
                                        <div className="dropdown" style={toggleItemStyle}>
                                            On
                                            <ToggleButton
                                                inactiveLabel={<X/>}
                                                activeLabel={<Check/>}
                                                value={this.state.shiftStatusOn}
                                                onToggle={this.handleShiftToggle}
                                            />

                                        </div>
                                        < div className="dropdown" style={toggleItemStyle}>
                                            Off
                                        </div>
                                    </div>
                                )}

                            </div>,
                            <div>
                                <button onClick="myFunction()" className="listButton default">Status</button>
                            </div>,
                            <div>
                                <button onClick="myFunction()" className="listButton default">Connectivity</button>
                            </div>,
                            <div>
                                <button onClick="myFunction()" className="listButton default">Rank</button>
                            </div>
                        ]}

                        titleStyle     =  {{backgroundColor: 'rgb(26, 26, 26)', fontFamily: 'Courier', fontSize: 25, textAlign: 'center'}}
                        itemStyle      =  {itemStyle}
                        // itemHoverStyle =  {{backgroundColor: '#000', color:"#fff"}}
                    />
                    <Route exact path='/' render={props => (
                        <React.Fragment>
                            <p></p>
                            <div>
                                {this.state.allDataLoaded? this.renderDriverTable(): <div style={{textAlign: 'center'}}>Data may have not been fetched yet</div>}
                            </div>
                        </React.Fragment>
                    )}>
                    </Route>
                    <Route path='/map' render={() => <Map drivers={this.state.drivers} getPastDrivers={this.getPastDrivers}/>}>
                    </Route>
                </div>
            </div>
        </Router>
    );
  }
}

function handleListDropDown(e) {
    this.setState({shiftStatusClicked: !this.state.shiftStatusClicked});
}

const windowStyle = {
  padding: '5px 5px',
  margin: '5px'
};

const itemStyle = {
    // backgroundColor: '#fff',
    padding: '22px',
    cursor: 'pointer',
    backgroundColor: 'rgb(255, 255, 255)',
    color: '#000',
};

const toggleItemStyle = {
    padding: '5px',
    fontSize: '20px',
    top: '10px',
    left: '50px',
};

export default App;
