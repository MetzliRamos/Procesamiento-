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

  export class MazeBall {
    protected x: number;
    protected y: number;
    protected size: number;
    protected ctx: CanvasRenderingContext2D;
    protected maze: number[][];
    protected mazeWidth: number;
    protected mazeHeight: number;
  
    constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D, maze: number[][]) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.ctx = ctx;
      this.maze = maze;
      this.mazeWidth = maze[0].length;
      this.mazeHeight = maze.length;
    }
  
    public update() {
      const direction = Math.floor(Math.random() * 4);
    
      const currentX = this.x;
      const currentY = this.y;
    
      switch (direction) {
        case 0:
          if (this.y > 0 && this.maze[this.y - 1][this.x] === 0) {
            this.y -= 1;
          }
          break;
        case 1:
          if (this.y < this.mazeHeight - 1 && this.maze[this.y + 1][this.x] === 0) {
            this.y += 1;
          }
          break;
        case 2:
          if (this.x > 0 && this.maze[this.y][this.x - 1] === 0) {
            this.x -= 1;
          }
          break;
        case 3:
          if (this.x < this.mazeWidth - 1 && this.maze[this.y][this.x + 1] === 0) {
            this.x += 1;
          }
          break;
        default:
          break;
      }
    
      if (this.maze[this.y][this.x] === 1) {
        this.x = currentX;
        this.y = currentY;
      }
    }
    public draw() {
      // Dibuja la bolita
      this.ctx.fillStyle = 'red'; // Color de la bolita
      this.ctx.beginPath();
      this.ctx.arc(this.x * this.size + this.size / 2, this.y * this.size + this.size / 2, this.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  export class ColorWheel {
    protected x: number;
    protected y: number;
    protected radius: number;
    protected ctx: CanvasRenderingContext2D;
    protected colors: string[];
    protected angle: number;
  
    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D, colors: string[]) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.ctx = ctx;
      this.colors = colors;
      this.angle = 0;
    }
  
    public draw() {
      const numColors = this.colors.length;
      const angleIncrement = (2 * Math.PI) / numColors;
  
      for (let i = 0; i < numColors; i++) {
        const startAngle = this.angle + i * angleIncrement;
        const endAngle = startAngle + angleIncrement;
  
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.arc(this.x, this.y, this.radius, startAngle, endAngle);
        this.ctx.fillStyle = this.colors[i];
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
  
    public update() {
      // Actualiza el ángulo para hacer girar la rueda
      this.angle += 0.01;
    }
  }