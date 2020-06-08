import React from 'react';
import Render from './Render';
import LayoutEditor from './LayoutEditor';

class CanvasArea extends React.Component {
  render() {
    if (this.props.view === 'render-view') {
      return <Render></Render>;
    } else if (this.props.view === 'layout-editor') {
      return <LayoutEditor></LayoutEditor>;
    } else {
      return <div> Hacker mode activated! </div>;
    }
  }
}

export default CanvasArea;
