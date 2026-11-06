// 繁星背景特效
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'starParticles';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let w, h;
  
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  // 繁星
  const stars = [];
  const starCount = 150;
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.03
    });
  }
  
  // 漂浮的小点点（带闪烁）
  const dots = [];
  const dotCount = 60;
  for (let i = 0; i < dotCount; i++) {
    dots.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      baseOpacity: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.03,
      color: Math.random() > 0.5 ? '#e8a8c4' : '#c4b5d9'
    });
  }
  
  let time = 0;
  
  function animate() {
    ctx.clearRect(0, 0, w, h);
    time += 0.01;
    
    // 画繁星
    stars.forEach(star => {
      const twinkle = Math.sin(time + star.phase) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = star.baseOpacity * twinkle;
      ctx.fill();
    });
    
    // 画漂浮的小点点（带闪烁）
    dots.forEach(dot => {
      dot.x += dot.vx;
      dot.y += dot.vy;
      
      if (dot.x < 0) dot.x = w;
      if (dot.x > w) dot.x = 0;
      if (dot.y < 0) dot.y = h;
      if (dot.y > h) dot.y = 0;
      
      const twinkle = Math.sin(time + dot.phase) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.globalAlpha = dot.baseOpacity * twinkle;
      ctx.fill();
    });
    
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  
  animate();
})();
