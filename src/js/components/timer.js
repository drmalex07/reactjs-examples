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
    this.tid = window.setInterval(this.tick.bind(this, 5.0), 5000);
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
    return React.createElement('p', null, 
      // Append children (text and element nodes),
      "Elapsed (since page load): ", 
      React.createElement('tt', null, this.state.elapsed.toFixed(1)),
      " seconds"
    );
  },

  // Helpers

  tick: function (x)
  {
    this.setState({elapsed: this.state.elapsed + x});
  },
});

module.exports = Timer;
