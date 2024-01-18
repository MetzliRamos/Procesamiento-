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


  
 export  class Clock {
    protected x: number;
    protected y: number;
    protected radius: number;
    protected needles: ClockNeedle[];
    protected ctx: CanvasRenderingContext2D;
  
    constructor(x: number, y: number, radius: number, numNeedles: number, ctx: CanvasRenderingContext2D) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.ctx = ctx;
      this.needles = [];
  
      for (let i = 0; i < numNeedles; i++) {
        const needle = new ClockNeedle(this.x, this.y, this.radius, ctx);
        this.needles.push(needle);
      }
    }
  
    public draw() {
      // Dibuja el cuerpo del reloj
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
  
      // Dibuja las agujas
      for (const needle of this.needles) {
        needle.draw();
      }
    }
  
    public update() {
      // Actualiza las agujas y el cuerpo del reloj
      for (const needle of this.needles) {
        needle.update();
      }
  
      // Aplica lógica de desaparición al cuerpo del reloj
      if (Math.random() < 0.01) {
        this.radius = 0;
      }
    }
  }
  
  export class ClockNeedle {
    protected x: number;
    protected y: number;
    protected radius: number;
    protected angle: number;
    protected ctx: CanvasRenderingContext2D;
  
    constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.angle = Math.random() * 360;
      this.ctx = ctx;
    }
  
    public draw() {
      const endX = this.x + Math.cos((this.angle * Math.PI) / 180) * this.radius;
      const endY = this.y + Math.sin((this.angle * Math.PI) / 180) * this.radius;
  
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  
    public update() {
      this.angle += 10;
  
      // Aplica lógica de desaparición a las agujas
      if (Math.random() < 0.01) {
        this.radius = 0;
      }
    }
  }
  
  export class Car {
    public x: number;
    public y: number;
    protected width: number;
    public height: number;
    protected ctx: CanvasRenderingContext2D;
    protected color: string;
  
    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, color: string) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.ctx = ctx;
      this.color = color;
    }
  
    public draw() {
      // Cuerpo del auto
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
  
      // Techo del auto
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x + this.width, this.y);
      this.ctx.lineTo(this.x + this.width * 0.8, this.y - this.height * 0.5);
      this.ctx.lineTo(this.x + this.width * 0.2, this.y - this.height * 0.5);
      this.ctx.closePath();
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
  
      // Ruedas
      const wheelRadius = this.height * 0.25;
      this.ctx.beginPath();
      this.ctx.arc(this.x + this.width * 0.2, this.y + this.height, wheelRadius, 0, Math.PI * 2);
      this.ctx.arc(this.x + this.width * 0.8, this.y + this.height, wheelRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
      this.ctx.closePath();
    }
  
    public move(speed: number) {
      this.y += speed;
      if (this.y > this.ctx.canvas.height) {
        this.y = -this.height; // Reinicia la posición si el auto sale de la pantalla
      }
    }
  }
  

  export class MovingCrosshair {
    protected x: number;
    protected y: number;
    protected size: number;
    protected ctx: CanvasRenderingContext2D;
    protected color: string;
  
    constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.ctx = ctx;
      this.color = 'red';
    }
  
    public update(mouseX: number, mouseY: number) {
      this.x = mouseX;
      this.y = mouseY;
    }
  
    public draw() {
      // Dibujar el círculo
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
      this.ctx.closePath();
  
      // Dibujar las líneas cruzadas
      this.ctx.beginPath();
      this.ctx.moveTo(this.x - this.size, this.y);
      this.ctx.lineTo(this.x + this.size, this.y);
      this.ctx.moveTo(this.x, this.y - this.size);
      this.ctx.lineTo(this.x, this.y + this.size);
      this.ctx.strokeStyle = this.color;
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }