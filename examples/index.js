/***  examples/src/index.js ***/
import React from 'react';
import { render} from 'react-dom';
import TimeRangeSlider from '../src';
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

	changeStartHandler(value){
		console.log("Start Handler Called", value);
	}

	timeChangeHandler(time){
        this.setState({
            value: time
        });
    }

	changeCompleteHandler(value){
		console.log("Complete Handler Called", value);
	}

	render() {
		return(<div style={{width:"300px",margin: "20px"}}>
			<div className="time-range">
				<b>Start Time:</b> {this.state.value.start}  <b>End Time:</b> {this.state.value.end}
			</div>
			<div className="time-range-slider">
		    	<TimeRangeSlider
					disabled={false}
					draggableTrack={true}
					maxValue={"23:59"}
					minValue={"00:00"}
					name={"ashvin"}
					onChangeStart={this.changeStartHandler}
					onChangeComplete={this.changeCompleteHandler}
					onChange={this.timeChangeHandler}
					step={15}
					value={this.state.value}/>
	    	</div>
	    </div>);
	}
};

render(<App />, document.getElementById("root"));
