import React from 'react';
import makerjs, { IModel } from 'makerjs';
import { mx as mxCutout, mxSpacing } from './cutouts';
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
    const spacingModels = centers.map(([x, y, width, height]) =>
      mxSpacing(x * 19.05, y * 19.05, width, height)
    );
    const cutoutsModel = {
      models: { ...cutoutModels },
      origin: [0, 0],
    } as IModel;

    const spacingsModel = {
      models: { ...spacingModels },
      origin: [0, 0],
    } as IModel;
    const flippedCutouts = makerjs.model.mirror(cutoutsModel, false, true);
    const flippedSpacing = makerjs.model.mirror(spacingsModel, false, true);
    if (
      flippedCutouts.models !== undefined &&
      flippedSpacing.models !== undefined
    ) {
      let plateBounds = {};
      for (const k in flippedCutouts.models) {
        // if (k.includes('1')) {
        plateBounds = makerjs.model.combineUnion(
          plateBounds,
          makerjs.model.outline(flippedSpacing.models[k], 6)
        );
        // }
      }
      const plateModel = {
        models: {
          switches: flippedCutouts,
          outline: plateBounds,
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
