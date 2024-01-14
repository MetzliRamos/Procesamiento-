export class TunnelCircle {
    protected x: number;
    protected y: number;
    public radius: number;
    protected ctx: CanvasRenderingContext2D;
  
    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.ctx = ctx;
    }
  
    public draw() {
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  
    public update() {
      this.radius += 1; 
    }
  }