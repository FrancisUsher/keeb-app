import React from 'react';
import Render from './Render';
import LayoutEditor from './LayoutEditor';

interface Props {
  view: String;
}

function CanvasArea(props: Props) {
  if (props.view === 'render-view') {
    return <Render></Render>;
  } else if (props.view === 'layout-editor') {
    return <LayoutEditor></LayoutEditor>;
  } else {
    return <div> Hacker mode activated! </div>;
  }
}

export default CanvasArea;
