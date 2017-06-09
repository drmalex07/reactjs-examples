const React = require('react');
const PropTypes = require('prop-types');
const { Dropdown, DropdownMenu, DropdownItem } = require('reactstrap');

class Header extends React.Component 
{
  constructor(props) 
  {
    super(props);

    this._toggleDropdown = this._toggleDropdown.bind(this);
    
    this.state = {
      dropdownOpen: false,
    };
  }
   
  _toggleDropdown() 
  {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }

  render() 
  {
    return (
      <header className="app-header navbar">
        
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" 
            onClick={() => this.props.styleSidebar('mobile-show')}>
          <i className="fa fa-navicon"></i>
        </button>
        <a className="navbar-brand" href="#"></a>
        
        {/* left-aligned menu items */}
        <ul className="nav navbar-nav d-md-down-none mr-auto">
          {/* toggle sidebar */}
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" 
                onClick={this.props.toggleSidebar}>
              <i className="fa fa-navicon"></i>
            </button>
          </li>       
          {/* left-aligned top navbar items */} 
          <li className="nav-item px-3">
            <a className="nav-link" href="#/dashboard">Dashboard</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="#/users">Users</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="#/settings">Settings</a>
          </li>
        </ul>

        {/* right-aligned menu items */}
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-bell"></i><span className="badge badge-pill badge-danger">5</span></a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-list"></i></a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-location-pin"></i></a>
          </li>
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this._toggleDropdown}>
              <button onClick={this._toggleDropdown} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" 
                  aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'img/avatar.jpg'} className="img-avatar" alt="admin@example.com"/>
                <span className="d-md-down-none">admin</span>
              </button>
              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center">
                  <strong>Account</strong>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-bell-o"></i> Updates<span className="badge badge-info">42</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-envelope-o"></i> Messages<span className="badge badge-success">42</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-tasks"></i> Tasks<span className="badge badge-danger">42</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-comments"></i> Comments<span className="badge badge-warning">42</span>
                </DropdownItem>
                <DropdownItem header className="text-center">
                  <strong>Settings</strong></DropdownItem>
                <DropdownItem>
                  <i className="fa fa-user"></i> Profile
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-wrench"></i> Settings
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-usd"></i> Payments<span className="badge badge-default">42</span>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-file"></i> Projects<span className="badge badge-primary">42</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className="fa fa-shield"></i> Lock Account
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-lock"></i> Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          {/* toggle aside menu */}
          <li className="nav-item d-md-down-none">
            <button className="nav-link navbar-toggler aside-menu-toggler" type="button" 
                onClick={this.props.toggleAsideMenu}>
              <i className="fa fa-navicon"></i>
            </button>
          </li>
        </ul>

      </header>
    );
  }
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  styleSidebar: PropTypes.func.isRequired,
  toggleAsideMenu: PropTypes.func.isRequired,
  styleAsideMenu: PropTypes.func.isRequired,
};

module.exports = Header;
