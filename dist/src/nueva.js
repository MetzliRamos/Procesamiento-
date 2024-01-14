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
