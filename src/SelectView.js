import React from 'react';

function SelectView(props) {
  const handleViewChange = (e) => props.onViewChange(e.target.value);
  return (
    <label>
      Select View
      <select value={props.view} onChange={handleViewChange}>
        <option value="layout-editor">Layout Editor</option>
        <option value="render-view">3-D Render</option>
        <option value="hacker-mode">Hacker Mode</option>
      </select>
    </label>
  );
}

export default SelectView;
