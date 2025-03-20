"use client";
import { useEffect, useRef } from 'react';

export default function WorldMap() {
  const canvasRef = useRef(null);

  // Adjusted coordinates to align with a world map
  const points = [
    { x: 150, y: 100, image: '/avatar1.jpg' },  // North America
    { x: 280, y: 90, image: '/avatar2.jpg' },   // Europe
    { x: 500, y: 130, image: '/avatar3.jpg' },  // Asia
    { x: 400, y: 200, image: '/avatar4.jpg' },  // Africa
    { x: 200, y: 250, image: '/avatar5.jpg' },  // South America
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio || 1;

    // Set canvas size dynamically
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * scale;
    canvas.height = 400 * scale; // Fixed height
    ctx.scale(scale, scale);

    // Draw world map dots
    const dotSize = 1.5;
    const spacing = 15;
    ctx.fillStyle = '#d1d5db';

    for (let x = 0; x < canvas.width / scale; x += spacing) {
      for (let y = 0; y < canvas.height / scale; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw connections (curved lines)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;

    points.forEach((point, i) => {
      points.forEach((targetPoint, j) => {
        if (i !== j) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          
          // Calculate smooth curve
          const controlX = (point.x + targetPoint.x) / 2;
          const controlY = Math.min(point.y, targetPoint.y) - 50;

          ctx.quadraticCurveTo(controlX, controlY, targetPoint.x, targetPoint.y);
          ctx.stroke();
        }
      });
    });

    // Load images and draw avatars
    let loadedImages = 0;
    const totalImages = points.length;
    const images = [];

    points.forEach((point, index) => {
      const img = new Image();
      img.src = point.image;
      img.onload = () => {
        images[index] = img;
        loadedImages++;
        if (loadedImages === totalImages) {
          drawAvatars();
        }
      };
    });

    function drawAvatars() {
      points.forEach((point, index) => {
        const img = images[index];
        if (!img) return;

        ctx.save();
        ctx.beginPath();
        ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, point.x - 20, point.y - 20, 40, 40);
        ctx.restore();

        // Draw border around avatars
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
  }, []);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: '400px' }}
      />
    </div>
  );
}
