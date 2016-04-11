var store = require('../store');

var incr = () => (store.dispatch({type: 'INCR'}));
var decr = () => (store.dispatch({type: 'DECR'}));
var colorize = (color) => (
  store.dispatch({type: 'CHANGE_COLOR', targetColor: color})
);

var Counter = React.createClass({
  
  // Lifecycle

  render: function ()
  {
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
          Colorize (RGB):
          <input
            type="color"
            ref={(c) => (this._colorInput = c)}
            onChange={(ev) => (colorize(ev.target.value), false)}
            maxlength="6" size="6"
           />
        </div>
      </div>
    );  
  },
});

module.exports = Counter;
