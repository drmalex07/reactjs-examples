const React = require('react');

var store = require('../store');
var actions = require('../actions');

var incr = () => (store.dispatch(actions.incrCounter()));
var decr = () => (store.dispatch(actions.decrCounter()));
var colorize = (color) => (store.dispatch(actions.changeColor(color)));

class Counter extends React.Component 
{
  render()
  {
    var {color, value} = this.props;
    return (
      <div className="counter">
        <div className="counter-value">
          <strong>Counter:</strong> 
          <span className="value" style={{color}}>{value}</span>
        </div>
        <div className="counter-buttons">
          <button onClick={incr}>Increment</button>
          <button onClick={decr}>Decrement</button>
          &nbsp;
          Colorize:
          <input
            type="color"
            defaultValue={color}
            onChange={(ev) => (colorize(ev.target.value), false)}
           />
        </div>
      </div>
    );  
  }
};

module.exports = Counter;
