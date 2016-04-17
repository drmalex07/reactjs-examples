var store = require('../store');
var actions = require('../actions');

var incr = () => (store.dispatch(actions.incrCounter()));
var decr = () => (store.dispatch(actions.decrCounter()));
var colorize = (color) => (store.dispatch(actions.changeColor(color)));

var Counter = React.createClass({
  
  // Lifecycle

  render: function ()
  {
    console.info('Rendering <Counter value=' + this.props.value + '>...')
    return (
      <div className="counter">
        <div className="counter-value">
          <strong>Counter:</strong> 
          <span className="value" style={{color: this.props.color}}>
            {this.props.value}
          </span>
        </div>
        <div className="counter-buttons">
          <button onClick={incr}>Increment</button>
          <button onClick={decr}>Decrement</button>
          &nbsp;
          Colorize:
          <input
            type="color"
            defaultValue={this.props.color}
            ref={(c) => (this._colorInput = c)}
            onChange={(ev) => (colorize(ev.target.value), false)}
           />
        </div>
      </div>
    );  
  },
});

module.exports = Counter;
