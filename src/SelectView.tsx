import React from 'react';

interface Props {
  view: string;
  onViewChange: Function;
}

function SelectView(props: Props) {
  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    props.onViewChange(e.target.value);
  return (
    <label>
      Select View
      <select value={props.view} onChange={handleViewChange}>
        <option value="layout-editor">Layout Editor</option>
        <option value="render-view">3-D Render</option>
        <option value="plate-gen">Plate Generator</option>
      </select>
    </label>
  );
}

export default SelectView;
