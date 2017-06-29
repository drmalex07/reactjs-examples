const React = require('react');

var Greeter = require('./greeter');
var Counter = require('./counter');
var SelectLanguage = require('./select-language');


class ContentRoot extends React.Component
{  
  render()
  {
    return (
      <div>
        <SelectLanguage />
        
        <section id='section-1'>
          <h3>Section #1</h3>
          <Greeter />
        </section>

        <section id='section-2'>
          <h3>Section #2</h3>
          <Counter/>
        </section>
      </div>
    );
  }
}

module.exports = ContentRoot;
