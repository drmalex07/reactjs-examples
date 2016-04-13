//var ReactRedux = require('react-redux');
var actions = require('../actions')

// See http://redux.js.org/docs/basics/UsageWithReact.html

// Create a presentational component (rely only on props); 
// This could also be a simple functional component (since it only defines render())

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
          <button onClick={this.props.incr}>Increment</button>
          <button onClick={this.props.decr}>Decrement</button>
          &nbsp;
          Colorize:
          <input
            type="color"
            defaultValue={this.props.color}
            ref={(c) => (this._colorInput = c)}
            onChange={(ev) => (this.props.colorize(ev.target.value), false)}
           />
        </div>
      </div>
    );  
  },
});

// Wrap into a container component (aware of Redux state)

const mapStateToProps = (state, ownProps) => ({
  value: state.value,
  color: state.color, 
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  incr: () => (
    dispatch(actions.incrCounter()), false),
  decr: () => (
    dispatch(actions.decrCounter()), false),
  colorize: (color) => (
    dispatch(actions.changeColor(color)), false),
})

Counter = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Counter);

// Export container

module.exports = Counter;
