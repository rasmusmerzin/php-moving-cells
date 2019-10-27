class Character {
  constructor(color='#000', posX=0, posY=0) {
    let div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.width = '100px';
    div.style.height = '20px';
    div.style.border = '3px solid ' +color;

    this._sizeX = 100;
    this._sizeY = 20;
    this._div = div;
    this._posX = posX;
    this._posY = posY;

    this.renderPos();
    document.body.appendChild(div);
  }

  get posX() { return this._posX; }
  get posY() { return this._posY; }

  renderPos() {
    this._div.style.left = this._posX *this._sizeX +'px';
    this._div.style.top = this._posY *this._sizeY +'px';
  }

  setPosX(x) {
    this._posX = x;
    this.renderPos();
    return this.posX;
  }

  setPosY(y) {
    this._posY = y;
    this.renderPos();
    return this.posY;
  }

  addPosX(a) {
    this._posX += a;
    this.renderPos();
    return this.posX;
  }

  addPosY(a) {
    this._posY += a;
    this.renderPos();
    return this.posY;
  }
}
