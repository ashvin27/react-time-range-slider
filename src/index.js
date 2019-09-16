/*** src/index.js ***/
import React, { Component } from "react";
import InputRange from "react-input-range";

class TimeRangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  minuteToTime(value) {
    value = value > 1439 ? 1439 : value;
    let hours = Math.floor(value / 60),
      minutes = value - hours * 60,
      ampm = null;

    if (hours.length == 1) hours = "0" + hours;
    if (minutes.length == 1) minutes = "0" + minutes;
    if (minutes == 0) minutes = "00";
    if (this.props.format == 12) {
      ampm = "AM";
      if (hours >= 12) {
        if (hours == 12) {
          hours = hours;
          minutes = minutes;
        } else {
          hours = hours - 12;
          minutes = minutes;
        }
        ampm = "PM";
      }
      if (hours == 0) {
        hours = 12;
        minutes = minutes;
      }
    }

    return { hours: hours, minutes: minutes, am_pm: ampm };
  }

  timeToMinute(time) {
    let rMinutes = 1439;
    if (this.props.format == 24) {
      time = time.split(":");
      if (time.length < 2) {
        throw new Error("Invalid time");
      }
      let hours = time[0],
        minutes = parseInt(time[1]);
      hours = parseInt(hours * 60);
      rMinutes = hours + minutes;
    } else {
      time = time.toUpperCase();
      time = time.replace(" ", "");
      let ampm = time.indexOf("AM") != -1 ? "AM" : "PM";
      time = time.replace(ampm, "");
      time = time.split(":");
      if (time.length < 2) {
        throw new Error("Invalid time");
      }
      let hours = parseInt(time[0]),
        minutes = parseInt(time[1]);
      if (ampm == "PM") {
        if (hours != 12) {
          hours = hours + 12;
        }
      } else {
        hours = hours == 12 ? 0 : hours;
      }
      hours = hours * 60;
      rMinutes = hours + minutes;
    }
    return rMinutes > 1439 ? 1439 : rMinutes;
  }

  onChange(value) {
    let start = this.minuteToTime(value.min);
    let end = this.minuteToTime(value.max);
    let nStart = start.hours + ":" + start.minutes;
    let nEnd = end.hours + ":" + end.minutes;
    if (this.props.format == 12) {
      nStart += " " + start.am_pm;
      nEnd += " " + end.am_pm;
    }
    this.props.onChange({
      start: nStart,
      end: nEnd
    });
  }

  onChangeComplete(value) {
    let start = this.minuteToTime(value.min),
      end = this.minuteToTime(value.max);
    this.props.onChangeComplete({
      start: start,
      end: end
    });
  }

  onChangeStart(value) {
    let start = this.minuteToTime(value.min),
      end = this.minuteToTime(value.max);
    this.props.onChangeStart({
      start: start,
      end: end
    });
  }

  render() {
    let { start, end } = this.props.value,
      min = this.timeToMinute(start),
      max = this.timeToMinute(end);
    return (
      <InputRange
        disabled={this.props.disabled}
        draggableTrack={this.props.draggableTrack}
        maxValue={this.timeToMinute(this.props.maxValue)}
        minValue={this.timeToMinute(this.props.minValue)}
        onChangeStart={this.onChangeStart.bind(this)}
        onChange={this.onChange.bind(this)}
        onChangeComplete={this.onChangeComplete.bind(this)}
        formatLabel={this.props.formatLabel}
        step={this.props.step}
        value={{ min: min, max: max }}
      />
    );
  }
}

TimeRangeSlider.defaultProps = {
  disabled: false,
  draggableTrack: false,
  format: 24,
  maxValue: "23:59",
  minValue: "00:00",
  onChange: () => {},
  onChangeComplete: () => {},
  onChangeStart: () => {},
  formatLabel: () => {},
  step: 15,
  value: {
    start: "00:00",
    end: "23:59"
  }
};

export default TimeRangeSlider;
