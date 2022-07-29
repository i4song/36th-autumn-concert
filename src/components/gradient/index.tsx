import React, { useRef } from 'react';
import COLORS from './colors';
import { GlowParticle } from './glowParticle';

// interface GradientProps {
//   width: string;
//   height: string;
// }

const Gradient = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  
  const pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;
  const totalParticles = 12;
  const particles: GlowParticle[] = [];
  const maxRadius = 900;
  const minRadius = 500;


  const resize = () => {
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = stageWidth * pixelRatio;
      canvas.height = stageHeight * pixelRatio;

      if(ctx) {
        ctx.scale(pixelRatio, pixelRatio);
        ctx.globalCompositeOperation = "saturation"
      }
    }

    createParticles();
  }

  const createParticles = () => {
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    let curColor = 1;
    for (let i = 0; i < totalParticles; i++) {
      const item = new GlowParticle({
        x: Math.random() * stageWidth,
        y: Math.random() * stageHeight,
        radius: Math.random() * (maxRadius - minRadius) + minRadius,
        rgb: COLORS[curColor]
      });

      if(++curColor >= COLORS.length) {
        curColor = 0;
      }

      particles[i] = item;
    }
  }

  const animate = () => {
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    window.requestAnimationFrame(animate);

    const canvas = canvasRef.current;
    if(canvas) {
      const ctx = canvas.getContext('2d');
      if(ctx) {
        ctx.clearRect(0, 0, stageWidth, stageHeight);

        for(let i=0; i<totalParticles; i++) {
          const item = particles[i];
          item.animate(ctx, stageWidth, stageHeight);
        }
      }
    }
  }

  window.addEventListener('resize', resize, false);
  resize();
  window.requestAnimationFrame(animate);

  return (
    <canvas ref={canvasRef} width={document.body.clientWidth} height={document.body.clientHeight} className="canvas" />
  )
}

export default Gradient;