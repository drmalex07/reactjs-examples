const React = require('react');
const PropTypes = require('prop-types');

var randomString = require('../helpers/random-string');

// Note:
// A portal is a component that represents a DOM subtree that we want to manage 
// separately from React's VDOM. So we will not trigger any updates (so, no render()
// will be attempted except for the 1st time). Instead, the contents of this portal 
// will be managed by other means (e.g. direct DOM manipulation etc.)

class FooPortal extends React.Component 
{
  // Lifecycle

  constructor(props)
  {
    super(props);
  }

  componentWillMount()
  {
    console.info('About to mount <FooPortal>...');
    if (!this.props.id)
      this._id = (this.props.id)? 
        this.props.id : (this.props.prefix + '-' + randomString());
  }

  componentDidMount()
  {
    console.info('Mounted <FooPortal #' + this._id + '>');
    // This DOM node is mounted, proceed to foo-specific initialization
    // independently of React's VDOM (e.g. initialize a jQuery widget, a
    // chart area etc.) 
    this._initializeContainer();
  }
  
  componentWillUnmount()
  {
    //console.info('About to unmount <FooPortal>...')
    // Cleanup: destroy self-managed container
    this._emptyContainer();
    this._el = null;
  }

  componentWillReceiveProps(nextProps)
  {
    //console.info('Received new props for <FooPortal>')
    // Must handle updates here for our self-managed container
    this._updateContainer(nextProps);
  }

  shouldComponentUpdate()
  { 
    return false; // never update (not to be managed be React's VDOM)
  }

  render()
  {
    // Because this is a portal component, we will only render once!
    return (
      <div 
        className={['portal', this.props.prefix].join(' ')} 
        ref={(el) => { this._el = el; }}
        id={this._id}>
      </div>
    );
  }

  // Helpers
  
  _genMessage(name)
  { 
    return document.createTextNode(
      'Hello, ' + name + ' (from inside the portal)!'
    );
  }

  _initializeContainer()
  {
    console.assert(this._el != null, "Expected an non-null DOM element!"); 
    var text1 = this._genMessage(this.props.name);
    this._el.appendChild(text1);
  }

  _updateContainer(nextProps)
  { 
    var el = this._el;
    if (this.props.name != nextProps.name) {
      // name has changed: replace the 1st text node
      var texts = Array.from(el.childNodes)
        .filter((e) => (e.nodeType == document.TEXT_NODE));
      var text1 = this._genMessage(nextProps.name);
      console.assert(texts.length == 1, 'Expected 1 text node!');
      el.removeChild(texts[0]);
      el.appendChild(text1);
    }
  }

  _emptyContainer()
  {
    // Remove children of this container
    var el = this._el;
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
}

FooPortal.propTypes = {
  id: PropTypes.string,
  prefix: PropTypes.string,
  name: PropTypes.string,
};

FooPortal.defaultProps = {
  prefix: 'foo',
};

module.exports = FooPortal;
