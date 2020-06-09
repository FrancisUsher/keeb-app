import React, { useRef } from 'react';

function draw(ctx, location) {
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 50, 50);
}

function LayoutEditor() {
  const canvasRef = useRef(null);

  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        draw(ctx, { x: e.clientX, y: e.clientY });
      }}
      width="800"
      height="600"
    ></canvas>
  );
}

export default LayoutEditor;
