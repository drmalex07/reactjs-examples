var React = global.React || require('react');

// Note:
// A portal is a component that represents a DOM subtree that we want 
// to manage separatedly from React's VDOM. So we will not trigger any
// updates (so, no render() will be attempted except for the 1st time).
// Instead, the contents of this portal will be managed by other means
// (e.g. direct DOM manipulation, jQuery-based DOM manipulation etc.)

var FooPortal = React.createClass({
 
  propTypes: {
    id: React.PropTypes.string,
    prefix: React.PropTypes.string,
    name: React.PropTypes.string,
  },

  // Lifecycle
  
  getDefaultProps: function ()
  {
    return {prefix: 'foo'};
  },

  componentWillMount: function ()
  {
    console.info('About to mount <FooPortal>...');
    if (!this.props.id)
      this._id = (this.props.id)? 
        (this.props.id):
        (this.props.prefix + '-' + randomString());
  },

  componentDidMount: function ()
  {
    console.info('Mounted <FooPortal #' + this._id + '>');
    // This DOM node is mounted, proceed to foo-specific initialization
    // independently of React's VDOM (e.g. initialize a jQuery widget, a
    // chart area etc.) 
    this._el = ReactDOM.findDOMNode(this);
    this.initializeContainer();
  },
  
  componentWillUnmount: function ()
  {
    console.info('About to unmount <FooPortal>...')
    // Cleanup: destroy self-managed container
    this.emptyContainer();
    this._el = null;
  },

  componentWillReceiveProps: function (nextProps)
  {
    console.info('Received new props for <FooPortal>')
    // Must handle updates here for our self-managed container
    this.updateContainer(nextProps);
  },

  shouldComponentUpdate: function ()
  {
    // Never update (not to be managed be React's VDOM)
    return false;
  },

  render: function ()
  {
    // Will only render the container (once!)
    return (
      <div className={['portal', this.props.prefix].join(' ')} id={this._id}></div>
    );
  },

  // Helpers
  
  _genMessage: function (name)
  { 
    return document.createTextNode(
      'Hello, ' + name + ' (from inside the portal)!'
    );
  },

  initializeContainer: function ()
  {
    var text1 = this._genMessage(this.props.name);
    this._el.appendChild(text1);
  },

  updateContainer: function (nextProps)
  { 
    var el = this._el;
    if (this.props.name != nextProps.name) {
      // Replace the 1st text node
      var texts = Array.from(el.childNodes).filter((e) => (e.nodeType == document.TEXT_NODE));
      var text1 = this._genMessage(nextProps.name);
      console.assert(texts.length == 1, 'Expected 1 text node!');
      el.removeChild(texts[0]);
      el.appendChild(text1);
    }
  },

  emptyContainer: function ()
  {
    // Remove children of this container
    var el = this._el;
    while (el.firstChild) {el.removeChild(el.firstChild);}
  },
});

var randomString = function ()
{
  return parseInt(Math.random() * 1e+9).toString(36);
};


module.exports = FooPortal;
