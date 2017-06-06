const React = require('react');
var {Button} = require('react-bootstrap');

const Seconds = ({seconds, highlighted}) => (
  <span 
    className={['seconds', highlighted? 'highlighted' : ''].join(' ')}>
    <tt>{seconds.toFixed(0)}</tt>{'s'}
  </span>
);

Seconds.displayName = 'Timer_Seconds';

class Timer extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.state = {
      elapsed: 0,
      highlighted: false,
    };

    this._resetTimer = this._resetTimer.bind(this);
  }

  componentDidMount()
  {
    // Set a periodic task, remember its task id (not part of state!)
    this.tid = window.setInterval(this._tick.bind(this, 1.0), 1e+3);
  }

  componentWillUnmount()
  {
    window.clearInterval(this.tid);
  }
  
  render()
  {
    return (
      <div className={'timer'}>
        {'Time elapsed (since page load):'}
        <Seconds 
          seconds={this.state.elapsed} 
          highlighted={this.state.highlighted}
        />
        &nbsp;
        <Button className={'reset-btn'}
          bsStyle='warning' // bsStyle is a ReactBootstrap-specific property
          style={{verticalAlign: 'baseline'}} // normal inline style
          onClick={this._resetTimer}>
          {'Reset'}
        </Button>
      </div>
    );
  }

  // Event handlers

  _tick(x)
  {
    this.setState({elapsed: this.state.elapsed + x});
  }

  _resetTimer()
  {
    this.setState({elapsed: .0, highlighted: true});

    // Highlight for only 2s
    window.setTimeout(() => {
      this.setState({highlighted: false});
    }, 2 * 1e+3);
  }
}

Timer.displayName = 'Timer';

module.exports = Timer;
