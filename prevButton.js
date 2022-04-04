class PrevButton {
    constructor(x, y) {
        this._x = 560;
        this._y = 665;
    }

    pintar() {
        fill(0);
        rect(this._x, this._y, 33, 20);
    }
}