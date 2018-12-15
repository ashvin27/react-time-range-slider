# react-time-range-slider

react-time-range-slider is a React component allowing users to integrate time range slider. It can accept start and end time. It also allow to define time format default 24 hour time format

## Demo
A running demo is available [here](https://ashvin27.github.io/react-time-range-slider/examples/)

## Installation

With [npm](https://npmjs.org/) installed, run

```
npm install react-time-range-slider
```

## Usage
```js
var TimeRangeSlider = require('react-time-range-slider')
```

```js
import React from 'react';
import { render} from 'react-dom';
import TimeRangeSlider from 'react-time-range-slider';
class App extends React.Component{
    constructor(props) {
        super(props);
        this.featureRef = React.createRef();
        this.changeStartHandler = this.changeStartHandler.bind(this);
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
        this.changeCompleteHandler = this.changeCompleteHandler.bind(this);
        this.state = {
            value: {
                start: "00:00",
                end: "23:59"
            }
        }
    }
    
    changeStartHandler(time){
        console.log("Start Handler Called", time);
    }
    
    timeChangeHandler(time){
        this.setState({
            value: time
        });
    }
    
    changeCompleteHandler(time){
        console.log("Complete Handler Called", time);
    }
    
    render() {
        return(<div>
            <TimeRangeSlider
                disabled={false}
                format={24}
                maxValue={"23:59"}
                minValue={"00:00"}
                name={"time_range"}
                onChangeStart={this.changeStartHandler}
                onChangeComplete={this.changeCompleteHandler}
                onChange={this.timeChangeHandler}
                step={15}
                value={this.state.value}/>
        </div>);
    }
};

render(<App />, document.getElementById("app"));
```

## API

### Options(props)

#### disabled: boolean
If this property is set to true, your component is disabled. This means you'll not able to interact with it.

#### draggableTrack: boolean
If this property is set to true, you can drag the entire track.

#### format: number
How times should be displayed. Possible values 12|24.

#### maxValue: string
Set a maximum value for your component. You cannot drag your slider beyond this value.

#### minValue: string
Set a minimum value for your component. You cannot drag your slider under this value.

#### name: string
Set a name for your form component.

#### onChange: Function(Range): void
Whenever your user interacts with your component (i.e.: dragging a slider), this function gets called. Inside the function, you should assign the new value to your component.

#### onChangeStart: Function(Range): void
Whenever your user starts interacting with your component (i.e.: `onMouseDown`, or `onTouchStart`), this function gets called.

#### onChangeComplete: Function(Range): void
Every mouse / touch event can trigger multiple updates, therefore causing `onChange` callback to fire multiple times. On the other hand, `onChangeComplete` callback only gets called when the user stops dragging.

#### step: number
The amount of time, in minutes, increment/decrement when time range change.

#### value: Range
Set the current value for your component

## Defaults
* disabled: `false`
* draggableTrack: `false`
* format: `24`
* maxValue: `23:59`
* minValue: `00:00`
* name: ` `
* step: `15`
* value: `{start: "00:00", end: "23:59"}`
