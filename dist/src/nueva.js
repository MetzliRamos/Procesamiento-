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
var MazeBall = /** @class */ (function () {
    function MazeBall(x, y, size, ctx, maze) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.maze = maze;
        this.mazeWidth = maze[0].length;
        this.mazeHeight = maze.length;
    }
    MazeBall.prototype.update = function () {
        var direction = Math.floor(Math.random() * 4);
        var currentX = this.x;
        var currentY = this.y;
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
    };
    MazeBall.prototype.draw = function () {
        // Dibuja la bolita
        this.ctx.fillStyle = 'red'; // Color de la bolita
        this.ctx.beginPath();
        this.ctx.arc(this.x * this.size + this.size / 2, this.y * this.size + this.size / 2, this.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
    };
    return MazeBall;
}());
export { MazeBall };
var ColorWheel = /** @class */ (function () {
    function ColorWheel(x, y, radius, ctx, colors) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.colors = colors;
        this.angle = 0;
    }
    ColorWheel.prototype.draw = function () {
        var numColors = this.colors.length;
        var angleIncrement = (2 * Math.PI) / numColors;
        for (var i = 0; i < numColors; i++) {
            var startAngle = this.angle + i * angleIncrement;
            var endAngle = startAngle + angleIncrement;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.arc(this.x, this.y, this.radius, startAngle, endAngle);
            this.ctx.fillStyle = this.colors[i];
            this.ctx.fill();
            this.ctx.closePath();
        }
    };
    ColorWheel.prototype.update = function () {
        // Actualiza el ángulo para hacer girar la rueda
        this.angle += 0.01;
    };
    return ColorWheel;
}());
export { ColorWheel };
var Clock = /** @class */ (function () {
    function Clock(x, y, radius, numNeedles, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.needles = [];
        for (var i = 0; i < numNeedles; i++) {
            var needle = new ClockNeedle(this.x, this.y, this.radius, ctx);
            this.needles.push(needle);
        }
    }
    Clock.prototype.draw = function () {
        // Dibuja el cuerpo del reloj
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        // Dibuja las agujas
        for (var _i = 0, _a = this.needles; _i < _a.length; _i++) {
            var needle = _a[_i];
            needle.draw();
        }
    };
    Clock.prototype.update = function () {
        // Actualiza las agujas y el cuerpo del reloj
        for (var _i = 0, _a = this.needles; _i < _a.length; _i++) {
            var needle = _a[_i];
            needle.update();
        }
        // Aplica lógica de desaparición al cuerpo del reloj
        if (Math.random() < 0.01) {
            this.radius = 0;
        }
    };
    return Clock;
}());
export { Clock };
var ClockNeedle = /** @class */ (function () {
    function ClockNeedle(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = Math.random() * 360;
        this.ctx = ctx;
    }
    ClockNeedle.prototype.draw = function () {
        var endX = this.x + Math.cos((this.angle * Math.PI) / 180) * this.radius;
        var endY = this.y + Math.sin((this.angle * Math.PI) / 180) * this.radius;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        this.ctx.closePath();
    };
    ClockNeedle.prototype.update = function () {
        this.angle += 10;
        // Aplica lógica de desaparición a las agujas
        if (Math.random() < 0.01) {
            this.radius = 0;
        }
    };
    return ClockNeedle;
}());
export { ClockNeedle };
var Car = /** @class */ (function () {
    function Car(x, y, width, height, ctx, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.color = color;
    }
    Car.prototype.draw = function () {
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
        var wheelRadius = this.height * 0.25;
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.width * 0.2, this.y + this.height, wheelRadius, 0, Math.PI * 2);
        this.ctx.arc(this.x + this.width * 0.8, this.y + this.height, wheelRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.closePath();
    };
    Car.prototype.move = function (speed) {
        this.y += speed;
        if (this.y > this.ctx.canvas.height) {
            this.y = -this.height; // Reinicia la posición si el auto sale de la pantalla
        }
    };
    return Car;
}());
export { Car };
var MovingCrosshair = /** @class */ (function () {
    function MovingCrosshair(x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.color = 'red';
    }
    MovingCrosshair.prototype.update = function (mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
    };
    MovingCrosshair.prototype.draw = function () {
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
    };
    return MovingCrosshair;
}());
export { MovingCrosshair };
