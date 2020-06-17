import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import makerjs, { IModel } from 'makerjs';
import { mx as mxCutout, bezelConcaveHull } from './cutouts';
import { deserialize, KLERow } from './deserialize';
// import { getCenters } from './generate';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

interface Props {
  rows: KLERow[];
}
const useStyles = makeStyles({
  root: {
    height: 600,
    position: 'absolute',
    right: 20,
    top: 60,
  },
});
function valuetext(value: number) {
  return `${value}`;
}

function PlateGen(props: Props) {
  const [convexity, setConvexity] = React.useState(3);
  const classes = useStyles();
  const handleChangeConvexity = (event: any, newValue: number | number[]) => {
    setConvexity(newValue as number);
  };
  if (props.rows.length > 0) {
    const keys = deserialize(props.rows);
    const cutoutModels = keys.map(mxCutout);
    const cutoutsModel = {
      models: { ...cutoutModels },
      origin: [0, 0],
    } as IModel;

    // const flippedCutouts = makerjs.model.mirror(cutoutsModel, false, true);
    // if (flippedCutouts.models !== undefined) {
    const plateModel = {
      models: {
        switches: cutoutsModel,
        // switches: flippedCutouts,
        outline: makerjs.model.outline(bezelConcaveHull(keys, convexity), 6),
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
        <div className={classes.root}>
          <Typography id="vertical-slider" gutterBottom>
            Convexity
          </Typography>
          <Slider
            step={0.8}
            marks
            min={1}
            max={20}
            orientation="vertical"
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            defaultValue={3}
            aria-labelledby="vertical-slider"
            onChange={handleChangeConvexity}
          />
        </div>
      </div>
    );
    // }
  }
  return <div> Load a KLE file to begin.</div>;
}

export default PlateGen;
