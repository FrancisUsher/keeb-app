import React, { useRef } from 'react';

interface Location {
  x: number;
  y: number;
}

function draw(ctx: CanvasRenderingContext2D, location: Location) {
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(location.x, location.y, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(location.x + 20, location.y + 20, 50, 50);
}

function LayoutEditor() {
  const canvasRef = useRef(null as HTMLCanvasElement | null);

  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => {
        const canvas = canvasRef.current;
        if (canvas !== null) {
          const ctx = canvas.getContext('2d');
          if (ctx !== null) {
            draw(ctx, { x: e.clientX, y: e.clientY });
          }
        }
      }}
      width="800"
      height="600"
    ></canvas>
  );
}

export default LayoutEditor;
