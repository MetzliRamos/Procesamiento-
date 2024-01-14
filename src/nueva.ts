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

  export class ChangingMaze {
    private ctx: CanvasRenderingContext2D;
    private maze: number[][];
    private mazeSize: number;
    private cellSize: number;
    private colors: string[];
  
    constructor(ctx: CanvasRenderingContext2D, mazeSize: number, cellSize: number) {
      this.ctx = ctx;
      this.mazeSize = mazeSize;
      this.cellSize = cellSize;
      this.colors = ['#ffffff', '#000000']; // Colores para las paredes y pasillos
  
      // Inicializa el laberinto
      this.generateMaze();
    }
  
    // Genera un laberinto aleatorio
    private generateMaze() {
      this.maze = [];
      for (let i = 0; i < this.mazeSize; i++) {
        const row = [];
        for (let j = 0; j < this.mazeSize; j++) {
          row.push(Math.random() < 0.5 ? 1 : 0); // 1 representa pared, 0 representa pasillo
        }
        this.maze.push(row);
      }
    }
  
    // Actualiza el laberinto cambiante
    public update() {
      // Cambia aleatoriamente algunas celdas del laberinto
      for (let i = 0; i < this.mazeSize; i++) {
        for (let j = 0; j < this.mazeSize; j++) {
          if (Math.random() < 0.02) { // Probabilidad de cambio, ajusta según sea necesario
            this.maze[i][j] = this.maze[i][j] === 1 ? 0 : 1;
          }
        }
      }
    }
  
    // Dibuja el laberinto en el lienzo
    public draw() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  
      for (let i = 0; i < this.mazeSize; i++) {
        for (let j = 0; j < this.mazeSize; j++) {
          const color = this.colors[this.maze[i][j]];
          this.ctx.fillStyle = color;
          this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }