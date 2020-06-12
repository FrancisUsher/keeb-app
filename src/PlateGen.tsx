import React from 'react';
import makerjs from 'makerjs';

function PlateGen() {
  const line = {
    type: 'line',
    origin: [0, 0],
    end: [50, 50],
  };
  const svg = makerjs.exporter.toSVG(line);
  // console.log(svg);
  const buff = new Buffer(svg);
  const base64data = buff.toString('base64');
  return (
    <div>
      {' '}
      <img
        alt="Plate preview."
        src={`data:image/svg+xml;base64,${base64data}`}
      />
    </div>
  );
}

export default PlateGen;
