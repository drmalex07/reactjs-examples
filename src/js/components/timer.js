
var Seconds = React.createClass({
  displayName: 'Timer_Seconds',
  
  // Lifecycle

  getInitialState: function ()
  {
    return {highlighted: false};
  },

  render: function () 
  {
    var cls1 = 'seconds', 
        cls2 = this.state.highlighted? 'highlighted' : '';
    return (
      <span className={[cls1, cls2].join(' ')}>
        <tt>{this.props.seconds.toFixed(0)}</tt>s
      </span>
    );
  },

  // Custom methods

  highlight: function (flag, duration)
  {
    this.setState({highlighted: flag});
    if (duration)
        window.setTimeout(this.highlight.bind(this, !flag, 0), duration);
  },
    
});

var Timer = React.createClass({
  displayName: "Timer",
 
  // Lifecycle

  getInitialState: function ()
  {
    return {elapsed: 0};
  },
  
  componentWillMount: function ()
  {
    console.info('About to mount <Timer>...');
  },

  componentDidMount: function ()
  {
    console.info('Mounted <Timer>');
    // Set a periodic task, remember its task id (not part of state!)
    this.tid = window.setInterval(this._tick.bind(this, 1.0), 1e+3);
  },

  componentWillUnmount: function ()
  {
    console.info('Unmounting <Timer>...');
    window.clearInterval(this.tid);
  },
  
  render: function ()
  {
    console.info('Rendering <Timer>...');
    return (
      <div className={'timer'}>
        Elapsed (since page load):
        <Seconds 
          seconds={this.state.elapsed}
          // The <Timer> will store a reference to this child component (as
          // soon as this is mounted to DOM).
          ref={(c) => (this._seconds = c)}
         />
        &nbsp; 
        <ReactBootstrap.Button 
          className={'reset-btn'}
          bsStyle='warning' // bsStyle is a ReactBootstrap-specific property
          style={{verticalAlign: 'baseline'}} // normal inline style
          onClick={this._resetTimer}
          // The <Timer> will store a reference directly to the HTML DOM element,
          // since this element is not represented by a React component.
          ref={(c) => (this._button = c)}
         >Reset</ReactBootstrap.Button>
      </div>
    );
  },

  // Event handlers

  _tick: function (x)
  {
    this.setState({elapsed: this.state.elapsed + x});
  },

  _resetTimer: function ()
  {
    console.info('About to reset timer for <Timer>...');
    // Update state, highlight once the new state is re-rendered
    this.setState({elapsed: .0}, this._highlight);
  },

  _highlight: function ()
  {
    // We keep a reference (via `ref` special property used inside render())
    // to our (subcomponent) seconds display.
    this._seconds.highlight(true, 2e+3); // highlight for 2s
  }
});

module.exports = Timer;
