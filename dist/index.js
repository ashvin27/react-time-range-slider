'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactInputRange = require('react-input-range');

var _reactInputRange2 = _interopRequireDefault(_reactInputRange);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*** src/index.js ***/


var TimeRangeSlider = function (_Component) {
  _inherits(TimeRangeSlider, _Component);

  function TimeRangeSlider(props) {
    _classCallCheck(this, TimeRangeSlider);

    var _this = _possibleConstructorReturn(this, (TimeRangeSlider.__proto__ || Object.getPrototypeOf(TimeRangeSlider)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TimeRangeSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'minuteToTime',
    value: function minuteToTime(value) {
      value = value > 1439 ? 1439 : value;
      var hours = Math.floor(value / 60),
          minutes = value - hours * 60,
          ampm = null;

      if (hours.length == 1) hours = '0' + hours;
      if (minutes.length == 1) minutes = '0' + minutes;
      if (minutes == 0) minutes = '00';
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
  }, {
    key: 'timeToMinute',
    value: function timeToMinute(time) {
      var rMinutes = 1439;
      if (this.props.format == 24) {
        time = time.split(":");
        if (time.length < 2) {
          throw new Error("Invalid time");
        }
        var hours = time[0],
            minutes = parseInt(time[1]);
        hours = parseInt(hours * 60);
        rMinutes = hours + minutes;
      } else {
        time = time.toUpperCase();
        time = time.replace(" ", "");
        var ampm = time.indexOf("AM") != -1 ? "AM" : "PM";
        time = time.replace(ampm, "");
        time = time.split(":");
        if (time.length < 2) {
          throw new Error("Invalid time");
        }
        var _hours = parseInt(time[0]),
            _minutes = parseInt(time[1]);
        if (ampm == "PM") {
          if (_hours != 12) {
            _hours = _hours + 12;
          }
        } else {
          _hours = _hours == 12 ? 0 : _hours;
        }
        _hours = _hours * 60;
        rMinutes = _hours + _minutes;
      }
      return rMinutes > 1439 ? 1439 : rMinutes;
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      var start = this.minuteToTime(value.min);
      var end = this.minuteToTime(value.max);
      var nStart = start.hours + ":" + start.minutes;
      var nEnd = end.hours + ":" + end.minutes;
      if (this.props.format == 12) {
        nStart += " " + start.am_pm;
        nEnd += " " + end.am_pm;
      }
      this.props.onChange({
        start: nStart,
        end: nEnd
      });
    }
  }, {
    key: 'onChangeComplete',
    value: function onChangeComplete(value) {
      var start = this.minuteToTime(value.min),
          end = this.minuteToTime(value.max);
      this.props.onChangeComplete({
        start: start,
        end: end
      });
    }
  }, {
    key: 'onChangeStart',
    value: function onChangeStart(value) {
      var start = this.minuteToTime(value.min),
          end = this.minuteToTime(value.max);
      this.props.onChangeStart({
        start: start,
        end: end
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$value = this.props.value,
          start = _props$value.start,
          end = _props$value.end,
          min = this.timeToMinute(start),
          max = this.timeToMinute(end);

      return _react2.default.createElement(_reactInputRange2.default, {
        disabled: this.props.disabled,
        draggableTrack: this.props.draggableTrack,
        maxValue: this.timeToMinute(this.props.maxValue),
        minValue: this.timeToMinute(this.props.minValue),
        onChangeStart: this.onChangeStart.bind(this),
        onChange: this.onChange.bind(this),
        onChangeComplete: this.onChangeComplete.bind(this),
        step: 15,
        value: { min: min, max: max } });
    }
  }]);

  return TimeRangeSlider;
}(_react.Component);

TimeRangeSlider.defaultProps = {
  disabled: false,
  draggableTrack: false,
  format: 24,
  maxValue: "23:59",
  minValue: "00:00",
  onChange: function onChange() {},
  onChangeComplete: function onChangeComplete() {},
  onChangeStart: function onChangeStart() {},
  step: 15,
  value: {
    start: "00:00",
    end: "23:59"
  }
};

exports.default = TimeRangeSlider;