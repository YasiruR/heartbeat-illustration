import React, {Component} from 'react'
import {Table} from 'react-bootstrap'

class DriverTable extends Component {   
    render() {
        let counter = 0;
        let rows = this.props.drivers.map(driver => {
            return (
                <DriverRow key={driver.driver_id} data={driver} counter={counter = counter + 1} suburb={driver.suburb}/>
            )
        });

        return (
            this.props.allDataLoaded &&
            <div>
                <Table striped bordered hover>
                    <thead style={{textDecoration: 'bold'}}>        {/*check decoration*/}
                    <tr style={{textAlign: 'center'}}>
                        <td></td>
                        <td>
                            Driver ID
                        </td>
                        <td>
                            Vehicle Model
                        </td>
                        <td>
                            Location (Lat, Lon)
                        </td>
                        <td>
                            Suburb
                        </td>
                        <td>
                            Direction
                        </td>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
        )
    }
}

const DriverRow = (props) => {
    return (
        <tr style={{textAlign: 'center'}}>
            <td>
                {props.counter}
            </td>
            <td>
                {props.data.id}
            </td>
            <td>
                {props.data.vehicle_model}
            </td>
            <td>
                {props.data.location.lat}, {props.data.location.lng}
            </td>
            <td>
                {props.data.suburb}
            </td>
            <td>
                {props.data.direction}
            </td>
        </tr>
    )
};

function findDirection(bearing) {
    if ((337.5<=bearing && bearing<=360) || (0<=bearing && bearing<22.5)) {
        return 'N'
    } else if (bearing<47.5) {
        return 'NE'
    } else if (bearing<112.5) {
        return 'E'
    } else if (bearing<157.5) {
        return 'SE'
    } else if (bearing<202.5) {
        return 'S'
    } else if (bearing<247.5) {
        return 'SW'
    } else if (bearing<292.5) {
        return 'W'
    } else if (bearing<337.5) {
        return 'SE'
    } else {
        return 'N/A'
    }
}

function selectVehicleModel(id) {
    switch (id) {
        case 1:
            return 'Tuk';
        case  2:
            return 'Mini';
        case 3:
            return 'Car';
        case 6:
            return 'VIP';
        case 7:
            return 'Jeep';
        case 10:
            return 'Van';
        case 12:
            return 'AID';
        case 15:
            return 'SOS';
        case 16:
            return 'Air Lift';
        case 4:
            return 'Nano';
        case 17:
            return 'Vesak';
        case 18:
            return 'Bike';
        case 19:
            return 'Budget';
        case 24:
            return 'Minivan';
        case 29:
            return 'Light Open';
        case 34:
            return 'Light';
        case 38:
            return 'Mover Open';
        case 42:
            return 'Mover';
        case 43:
            return 'Food';
        case 44:
            return 'Buddy';
        case 45:
            return 'Safari Light';
        case 46:
            return 'Safari Max';
        case 47:
            return 'Shuttle';
        default:
            return 'Not recognized'
    }
}

export default DriverTable