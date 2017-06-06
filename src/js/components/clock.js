const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');

var actions = require('../actions');

//
// Define presentational components
//

const Datestamp = ({t}) => (
  <span className={'datestamp' + (t? '' : ' error')}>
    {t? ((new Date(t)).toLocaleString()) : ('No time data!')}
  </span>
);

// A clock that synchronizes (on demand) with the server clock
class Clock extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      elapsed: 0, // seconds elapsed since last sync
    };
  }
  
  componentWillUnmount()
  {
    this._stopTimer(); // stop timer, if started
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.serverTime > this.props.serverTime) {
      this._restartTimer();
    }
  }

  render() 
  {
    return (
      <div className="clock">
        <Datestamp t={this._currentTime()}/>
        &nbsp;&nbsp;
        <button onClick={() => (this.props.refresh(), false)}>{'Sync now!'}</button>
      </div>
    );
  }

  // Helpers
 
  _currentTime()
  {
    return (this.props.serverTime)? 
      (this.props.serverTime + this.state.elapsed): // millis since Epoch
      undefined;
  }

  _tick()
  {
    this.setState({elapsed: this.state.elapsed + 1e+3});
  }

  _restartTimer()
  {
    this._stopTimer();
    this.setState({elapsed: 0});
    this.tid = window.setInterval(this._tick.bind(this), 1e+3); 
  }

  _stopTimer()
  {
    if (this.tid) {
      window.clearInterval(this.tid);
    }
    this.tid = null;
  }
}

Clock.propTypes = {
  serverTime: PropTypes.number,
  refresh: PropTypes.func.isRequired,
};

//
// Wrap in a container component
//

const mapStateToProps = (state, ownProps) => ({
  serverTime: state.receivedTime.serverTime,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh: function () {
    // Fetch time from server's "Date" header
    dispatch(actions.askTime());
    fetch('/api/action/echo')
      .then(res => (new Date(res.headers.get('Date'))))
      .then(res => (dispatch(actions.setTime(res, new Date()))));
  },
});

Clock = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Clock);

// Export

module.exports = Clock;
