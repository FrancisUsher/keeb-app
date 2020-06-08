import React from 'react';

class SelectView extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onViewChange(event.target.value);
  }

  render() {
    return (
      <label>
        Select View
        <select value={this.props.view} onChange={this.handleChange}>
          <option value="layout-editor">Layout Editor</option>
          <option value="render-view">3-D Render</option>
          <option value="hacker-mode">Hacker Mode</option>
        </select>
      </label>
    );
  }
}

export default SelectView;
