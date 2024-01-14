var TunnelCircle = /** @class */ (function () {
    function TunnelCircle(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
    }
    TunnelCircle.prototype.draw = function () {
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();
    };
    TunnelCircle.prototype.update = function () {
        this.radius += 1;
    };
    return TunnelCircle;
}());
export { TunnelCircle };
var ChangingMaze = /** @class */ (function () {
    function ChangingMaze(ctx, mazeSize, cellSize) {
        this.ctx = ctx;
        this.mazeSize = mazeSize;
        this.cellSize = cellSize;
        this.colors = ['#ffffff', '#000000']; // Colores para las paredes y pasillos
        // Inicializa el laberinto
        this.generateMaze();
    }
    // Genera un laberinto aleatorio
    ChangingMaze.prototype.generateMaze = function () {
        this.maze = [];
        for (var i = 0; i < this.mazeSize; i++) {
            var row = [];
            for (var j = 0; j < this.mazeSize; j++) {
                row.push(Math.random() < 0.5 ? 1 : 0); // 1 representa pared, 0 representa pasillo
            }
            this.maze.push(row);
        }
    };
    // Actualiza el laberinto cambiante
    ChangingMaze.prototype.update = function () {
        // Cambia aleatoriamente algunas celdas del laberinto
        for (var i = 0; i < this.mazeSize; i++) {
            for (var j = 0; j < this.mazeSize; j++) {
                if (Math.random() < 0.02) { // Probabilidad de cambio, ajusta según sea necesario
                    this.maze[i][j] = this.maze[i][j] === 1 ? 0 : 1;
                }
            }
        }
    };
    // Dibuja el laberinto en el lienzo
    ChangingMaze.prototype.draw = function () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.mazeSize; i++) {
            for (var j = 0; j < this.mazeSize; j++) {
                var color = this.colors[this.maze[i][j]];
                this.ctx.fillStyle = color;
                this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    };
    return ChangingMaze;
}());
export { ChangingMaze };
