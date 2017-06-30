const React = require('react');
const Reactstrap = require('reactstrap');
const {FormattedMessage} = require('react-intl');
const _ = require('lodash');

const {
    Container, Row, Col,
    Card, CardText, CardHeader, CardBlock, CardTitle, CardSubtitle,
    Button, ButtonGroup, ButtonDropdown, Dropdown,
    DropdownToggle, DropdownMenu, DropdownItem,
    Form, FormGroup, Label, Input,
  } = Reactstrap; 

class SettingsForm extends React.Component
{
  constructor(props)
  {
    super(props);

    this._somethingOptions = {
      "a": {value: 'a', title: 'Action alpha'},  
      "b": {value: 'b', title: 'Action beta'},  
    };
    
    this.state = {
      language: 'en',
      somethingDropdownOpen: false,
      somethingOption: 'a',
    };
  }
  
  _somethingDropdownPrompt()
  {
    var {somethingOption: opt} = this.state;
    var title = this._somethingOptions[opt].title;
    return (
      <FormattedMessage 
        id="settings-form.something-propmt"
        defaultMessage="Do something: {title}" 
        values={{title}} 
       />
    );
  }
  
  _onSelectSomething(value)
  {
    this.setState({somethingOption: value});
    return true; 
  }

  _onSelectLanguage(value)
  {
    this.setState({language: value});
    return false; 
  }

  render() {

    return (
        <Row>
          <Col xs="6"> 
            
            <Card>
              <CardHeader>
                <CardTitle>
                  <FormattedMessage id="settings-form.title" defaultMessage="Edit settings" />
                </CardTitle>  
              </CardHeader>
  
              <CardBlock>
                <Form>
                  <FormGroup>
                     <Label>Your email:</Label> 
                     <Input type="email" name="email" placeholder="with a placeholder" />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>
                      <FormattedMessage id="settings-form.language-label" defaultMessage="Select your language" />
                    </Label>
                    <Input type="select" value={this.state.language} onChange={(ev) => this._onSelectLanguage(ev.target.value)}>
                      <option value="en">English</option>
                      <option value="el">Greek</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    {/*<Label>Select something</Label>*/}
                    {/* Visually emulate a <select> using a <Dropdown> */}
                    <div>  
                      <Dropdown 
                        isOpen={this.state.somethingDropdownOpen} 
                        toggle={() => this.setState({somethingDropdownOpen: !this.state.somethingDropdownOpen})}
                       >
                        <DropdownToggle>
                          <span className="text-left" style={{"min-width": '22em', 'display': 'inline-block'}}>{this._somethingDropdownPrompt()}</span>
                          <i className="fa fa-caret-down"></i>
                        </DropdownToggle>
                        <DropdownMenu style={{"min-width": '25em'}}>
                          {_.values(this._somethingOptions).map(y => (
                            <DropdownItem key={y.value} onClick={() => this._onSelectSomething(y.value)}>
                              {y.title}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div> 
                  </FormGroup>

                  <Button className="pull-right" outline color="primary">
                    <FormattedMessage id="forms.save" defaultMessage="Save" />
                  </Button>
                </Form>
              
              </CardBlock>
            </Card>

          </Col>
        </Row>
    );
  }
}

module.exports = SettingsForm;
