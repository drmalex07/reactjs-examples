//var ReactRedux = require('react-redux');
var actions = require('../actions');

//
// Define presentational components
//

var Datestamp = ({t}) => (
  <span className={'datestamp' + (t? '' : ' error')}>
    {t? ((new Date(t)).toLocaleString()) : ('No time data!')}
  </span>
);

// A clock that synchronizes (on demand) with the server clock
var Clock = React.createClass({
  
  propTypes: {
    serverTime: React.PropTypes.number,
    refresh: React.PropTypes.func.isRequired,
  },

  // Lifecycle

  getInitialState: () => ({
    elapsed: 0, // seconds elapsed since last sync
  }),

  componentDidMount: function ()
  {
    // noop
  },
  
  componentWillUnmount: function ()
  {
    this.stopTimer(); // stop timer, if started
  },

  componentWillReceiveProps: function (nextProps)
  {
    console.info('The <Clock> received new props:', nextProps); 
    if (nextProps.serverTime > this.props.serverTime) {
      this.restartTimer();
    }
  },

  render: function () 
  {
    console.info('Rendering <Clock serverTime="' + this.props.serverTime + '">');
    return (
      <div className="clock">
        <Datestamp t={this.currentTime()}/>&nbsp;&nbsp;
        <button onClick={(ev) => (this.props.refresh(), false)}>{'Sync now!'}</button>
      </div>
    );
  },

  // Helpers
 
  currentTime: function ()
  {
    return (this.props.serverTime)? 
      (this.props.serverTime + this.state.elapsed): // millis since Epoch
      (undefined);
  },

  tick: function ()
  {
    this.setState({elapsed: this.state.elapsed + 1e+3});
  },

  restartTimer: function ()
  {
    this.stopTimer();
    this.setState({elapsed: 0});
    this.tid = setInterval(this.tick, 1e+3); 
  },

  stopTimer: function ()
  {
    if (this.tid) {
      clearInterval(this.tid);
    }
    this.tid = null;
  },
});

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
})

Clock = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Clock);

// Export

module.exports = Clock;
