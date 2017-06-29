const React = require('react');
const ReactRedux = require('react-redux');

const ReactIntl = require('react-intl');


//
// Define presentational component
//

class SelectLanguage extends React.Component 
{
  render() 
  {
    var {locale} = this.props;
    
    return (
      <div>
        <label>{'Select language:'}</label>
        &nbsp;&nbsp;
        <select onChange={(ev) => (this.props.changeLanguage(ev.target.value))} value={locale}>
          <option value="en">English</option>
          <option value="el">Greek</option>
        </select>
      </div>
    );
  }
}

//
// Wrap into a connected component
//

const actions = require('../actions');

const mapStateToProps = (state, ownProps) => ({
  locale: state.locale,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeLanguage: (l) => dispatch(actions.changeLocale(l)),
});

SelectLanguage = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);


module.exports = SelectLanguage;
