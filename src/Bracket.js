import React from 'react';
import 'jquery-bracket/dist/jquery.bracket.min.css';
import $ from 'jquery';

class Bracket extends React.PureComponent {
  ref = React.createRef();

  componentDidMount() {
    // needs to be imported dynamically or else Razzle chokes looking for the jQuery global
    import('jquery-bracket/dist/jquery.bracket.min.js').then(() => {
      this.updateBracket();
    });
  }

  componentDidUpdate() {
    this.updateBracket();
  }

  updateBracket() {
    if (this.ref.current) {
      $(this.ref.current).bracket(this.props);
    }
  }

  render() {
    return <div ref={this.ref} />;
  }
}

export default Bracket;
