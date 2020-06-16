import React from 'react';
import makerjs, { IModel } from 'makerjs';
import { mx as mxCutout, bezelConcaveHull } from './cutouts';
import { deserialize, Row } from './deserialize';
import { getCenters } from './generate';

interface Props {
  rows: Row[];
}

function PlateGen(props: Props) {
  if (props.rows.length > 0) {
    const keys = deserialize(props.rows);
    console.log(keys);
    const centers = getCenters(keys);
    const cutoutModels = centers.map(([x, y]) =>
      mxCutout(x * 19.05, y * 19.05)
    );
    const cutoutsModel = {
      models: { ...cutoutModels },
      origin: [0, 0],
    } as IModel;

    const flippedCutouts = makerjs.model.mirror(cutoutsModel, false, true);
    if (flippedCutouts.models !== undefined) {
      const plateModel = {
        models: {
          switches: flippedCutouts,
          outline: makerjs.model.outline(bezelConcaveHull(centers, 3), 6),
        },
      };
      // const drawing = mxCutout(5, 5);
      const svg = makerjs.exporter.toSVG(plateModel, {
        units: makerjs.unitType.Millimeter,
        stroke: 'white',
      });
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
  }
  return <div> Load a KLE file to begin.</div>;
}

export default PlateGen;
