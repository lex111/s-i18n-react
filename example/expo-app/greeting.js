import { Component } from 'react';

const t = require('./locale.js');

export default class Greeting extends Component {
  render() {
    return (
      t.t("Hello {name}. This is a component using t()", {
        name: this.props.name
      })
    )
  }
}
