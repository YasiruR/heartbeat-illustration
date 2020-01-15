import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react'
import carIcon from '../images/car10.png'
import tukIcon from '../images/tuk10.png'
import miniIcon from '../images/mini10.png'
import stdIcon from '../images/jeep10.png'
import Img from 'react-image'
import { Slider, Handles, Ticks } from 'react-compound-slider'
import {Handle, Tick} from "./Slider";

const CarIcon = () => <Img src={carIcon}/>;
const TukIcon = () => <Img src={tukIcon}/>;
const MiniIcon = () => <Img src={miniIcon}/>;
const StdIcon = () => <Img src={stdIcon}/>;

class GoogleMap extends Component {

    state = {
        currentHour: 0,
        currentMinute: 0,
    };

    static defaultProps = {
        center: {
            lat: 6.929251,
            lng: 79.849079
        },
        zoom: 11
    };

    setInitialTimeValues = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        this.setState({currentHour});
        const currentMinute = currentTime.getMinutes();
        this.setState({currentMinute});
    };

    componentDidMount() {
        this.setInitialTimeValues();
    }

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    // bootstrapURLKeys={{key: 'AIzaSyBCwNG2dVO_mHjmLnOKm3S9_6f-PkoJSCg'}}
                    bootstrapURLKeys={{key: 'AIzaSyAqOQL2BeTU0754erJ5C_tSaanbc4E_l1g'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                {this.props.drivers.map(driver =>
                    {
                        if(driver.vehicle_model === "Car") {
                            return (
                                <CarIcon lat={driver.location.lat} lng={driver.location.lng}/>
                            )
                        } else if(driver.vehicle_model === "Tuk") {
                            return (
                                <TukIcon lat={driver.location.lat} lng={driver.location.lng}/>
                            )
                        } else if(driver.vehicle_model === "Mini") {
                            return (
                                <MiniIcon lat={driver.location.lat} lng={driver.location.lng}/>
                            )
                        }
                        else {
                            return (
                                <StdIcon lat={driver.location.lat} lng={driver.location.lng}/>
                            )
                        }
                    }
                 )}
                </GoogleMapReact>
                <Slider
                    rootStyle={sliderStyle}
                    domain={[0, 24]}
                    step={1/60}
                    mode={2}
                    values={[this.state.currentHour + this.state.currentMinute / 60]}
                >
                    <div style={railStyle} />
                    <Handles>
                        {({ handles, getHandleProps, getPastDrivers=this.props.getPastDrivers}) => (        //TODO: ask
                            <div className="slider-handles">
                                {handles.map(handle => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        getHandleProps={getHandleProps}
                                        getPastDrivers={getPastDrivers}
                                    />
                                ))}
                            </div>
                        )}
                    </Handles>
                    <Ticks count={24}>
                        {({ ticks }) => (
                            <div className="slider-ticks">
                                {ticks.map(tick => (
                                    <Tick key={tick.id} tick={tick} count={ticks.length} />
                                ))}
                            </div>
                        )}
                    </Ticks>
                </Slider>
            </div>
        );
    }
}

const sliderStyle = {  // Give the slider some width
    position: 'fixed',
    bottom: 0,
    left: 0,
    margin: '15px',
    width: '100%',
    height: 80,
    border: '1px solid steelblue',
    backgroundColor: 'rgb(51, 51, 51)',
};

const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: 'rgb(255, 255, 255)',
};

export default GoogleMap;
