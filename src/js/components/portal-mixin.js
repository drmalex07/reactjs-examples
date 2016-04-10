
// Note:
// A portal is a component that represents a DOM subtree that we want 
// to manage separatedly from React's VDOM. So we will not trigger any
// updates (so, no render() will be attempted except for the 1st time).
// Instead, the contents of this portal will be managed by other means
// (e.g. direct DOM manipulation, jQuery-based DOM manipulation etc.)

var PortalMixin = {

  propTypes : {
    id : React.PropTypes.string,
    prefix: React.PropTypes.string
  },
  
  //
  // Lifecycle methods
  //

  getDefaultProps: function ()
  {
    return {prefix: 'mixin'};
  },

  componentWillMount: function ()
  {
    console.info('About to mount portal <' + this.constructor.displayName + '>...');
    if (!this.props.id)
      this.props.id = this.props.prefix + '-' + randomString();
  },

  componentDidMount: function ()
  {
    console.info('Mounted <' + this.constructor.displayName + ' #' + this.props.id + '>');
    // This DOM node is mounted, proceed to foo-specific initialization
    // independently of React's VDOM (e.g. initialize a jQuery widget, a
    // chart area etc.) 
    this._el = ReactDOM.findDOMNode(this);
    this._initializeContainer();
  },
  
  componentWillUnmount: function ()
  {
    console.info('About to unmount <' + this.constructor.displayName + '>...')
    // Cleanup: destroy self-managed container
    this._destroyContainer();
    this._el = null;
  },

  componentWillReceiveProps: function (nextProps)
  {
    console.info('Received new props for <' + this.constructor.displayName + '>')
    if (!nextProps.id)
      nextProps.id = this.props.id; // keep our id
    // Must handle updates here for our self-managed container
    this._updateContainer(nextProps);
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
      <div className={this.props.prefix + "-portal"} id={this.props.id}></div>
    );
  },

  //
  // Container methods
  //

  _initializeContainer: function ()
  {
    // Implement in actual component
  },

  _updateContainer: function (nextProps)
  { 
    // Implement in actual component
  },

  _destroyContainer: function ()
  {
    // Remove children of this container
    var el = this._el;
    while(el.firstChild) {el.removeChild(el.firstChild);}
  },
};

var randomString = function ()
{
  return parseInt(Math.random() * 1e+9).toString(36);
};

module.exports = PortalMixin;

