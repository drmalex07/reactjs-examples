const React = require('react');
const PropTypes = require('prop-types');

class LoginForm extends React.Component 
{
  render() 
  {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block">
                    <h1>{'Login'}</h1>
                    <p className="text-muted">{'Sign into your account'}</p>
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input type="text" className="form-control" placeholder="username"/>
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" placeholder="password"/>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="button" className="btn btn-primary px-4">{'Login'}</button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">{'Forgot password?'}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-inverse card-primary py-5 d-md-down-none">
                  <div className="card-block text-center">
                    <div>
                      <h2>{'Sign up'}</h2>
                      <p>{'Register for a new account'}</p>
                      <button type="button" className="btn btn-primary active mt-3">{'Register!'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {

};

LoginForm.defaultProps = {

};

module.exports = LoginForm;
