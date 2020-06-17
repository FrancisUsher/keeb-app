import React from 'react';
import Render from './Render';
import LayoutEditor from './LayoutEditor';
import PlateGen from './PlateGen';
import { KLERow } from './deserialize';

interface Props {
  view: String;
  rows: KLERow[];
}

function CanvasArea(props: Props) {
  if (props.view === 'render-view') {
    return <Render rows={props.rows}></Render>;
  } else if (props.view === 'layout-editor') {
    return <LayoutEditor></LayoutEditor>;
  } else if (props.view === 'plate-gen') {
    return <PlateGen rows={props.rows}></PlateGen>;
  } else {
    return <div> Hacker mode activated! </div>;
  }
}

export default CanvasArea;
