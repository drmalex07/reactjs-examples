
var Seconds = React.createClass({
  displayName: 'Timer_Seconds',
  
  render: function () 
  {
    return React.createElement('span', 
      {className: 'seconds'}, 
      React.createElement('tt', null, this.props.seconds.toFixed(0)),
      's'
    );
  },
});

var Timer = React.createClass({
  displayName: "Timer",
 
  // Lifecycle

  getInitialState: function ()
  {
    return {elapsed: 0};
  },
  
  componentDidMount: function ()
  {
    console.info('A <Timer> component is mounted...');
    this.tid = window.setInterval(this._tick.bind(this, 5.0), 5000);
    console.info('A <Timer> component has set a interval with tid=' + this.tid);
  },

  componentWillUnmount: function ()
  {
    console.info('A <Timer> component will unmount...');
    window.clearInterval(this.tid);
    console.info('A <Timer> component cleared interval with tid=' + this.tid);
  },
  
  render: function ()
  {
    return React.createElement(
      'div', 
      {className: 'timer'}, 
      // Append children (text and element nodes),
      "Elapsed (since page load): ", 
      React.createElement(Seconds, {seconds: this.state.elapsed}),
      ' ',
      React.createElement('button', {
        className: 'reset-btn', onClick: this._resetTimer}, 'Reset')
    );
  },

  // Event handlers

  _tick: function (x)
  {
    this.setState({elapsed: this.state.elapsed + x});
  },

  _resetTimer: function ()
  {
    console.info('A <Timer> is reset');
    this.setState({elapsed: .0});
  },
});

module.exports = Timer;
