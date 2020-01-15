import React from 'react';

export function Handle({handle: {id, value, percent}, getHandleProps, getPastDrivers}) {
    let hour = Math.floor(value);
    let min = getMinuteValue(value);
    return (
        <div
            style={{
                left: `${percent}%`,
                position: 'absolute',
                marginLeft: -15,
                marginTop: 25,
                zIndex: 2,
                width: 30,
                height: 30,
                border: 0,
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundColor: 'rgb(125, 124, 127)',
                color: '#FFFFFF',
            }}
            {...getHandleProps(id)}
        >
            <div style={{ fontFamily: 'Roboto', fontSize: 15, marginTop: -23 }}>
                {getPastDrivers(hour, min)}
                {hour + ':' + min}
            </div>
        </div>
    )
}

export function Tick({ tick, count }) {  // your own tick component
    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    marginTop: 52,
                    marginLeft: -0.5,
                    width: 1,
                    height: 8,
                    backgroundColor: 'silver',
                    left: `${tick.percent}%`,
                    color: '#FFFFFF',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    marginTop: 60,
                    fontSize: 10,
                    textAlign: 'center',
                    marginLeft: `${-(100 / count) / 2}%`,
                    width: `${100 / count}%`,
                    left: `${tick.percent}%`,
                    color: '#FFFFFF',
                }}
            >
                {tick.value}
            </div>
        </div>
    )
}

function getMinuteValue(value) {
    let decimal = value%1;
    if (decimal === 0.0) {
        return '00'
    } else if (Math.round(decimal*60) === 1.0) {
        return '01'
    } else if (Math.round(decimal*60) === 2.0) {
        return '02'
    } else if (Math.round(decimal*60) === 3.0) {
        return '03'
    } else if (Math.round(decimal*60) === 4.0) {
        return '04'
    } else if (Math.round(decimal*60) === 5.0) {
        return '05'
    } else if (Math.round(decimal*60) === 6.0) {
        return '06'
    } else if (Math.round(decimal*60) === 7.0) {
        return '07'
    } else if (Math.round(decimal*60) === 8.0) {
        return '08'
    } else if (Math.round(decimal*60) === 9.0) {
        return '09'
    }
    return Math.round(decimal*60);
}

