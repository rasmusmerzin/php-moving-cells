const CTRLS = {
  left: 'ArrowLeft',
  down: 'ArrowDown',
  up: 'ArrowUp',
  right: 'ArrowRight',
};
const COLORS = ['blue', 'red', 'yellow', 'green', 'orange', 'purple', 'pink'];
const CHR = new Character();
const PEERS = {};
let client;

document.addEventListener('keydown', e => {
  let update;
  switch (e.code) {
    case CTRLS.left:
      CHR.addPosX(-1);
      update = true;
      break;
    case CTRLS.down:
      CHR.addPosY(1);
      update = true;
      break;
    case CTRLS.up:
      CHR.addPosY(-1);
      update = true;
      break;
    case CTRLS.right:
      CHR.addPosX(1);
      update = true;
      break;
  }
  if (update !== undefined && client !== undefined) {
    requestPOST('../php/main.php', {
      requestID: 1,
      clientID: client,
      posX: CHR.posX,
      posY: CHR.posY
    });
  }
});

requestPOST('../php/main.php', {requestID: 0}, result => { client = result.clientID; });

setInterval(() => {
  if (client === undefined) return;
  requestPOST('../php/main.php', {requestID: 2, clientID: client}, data => {
    Object.keys(data).forEach(key => {
      if (PEERS[key]) {
        PEERS[key].setPosX(data[key].posX);
        PEERS[key].setPosY(data[key].posY);
      } else if (key != client) {
        PEERS[key] = new Character(COLORS[key]);
      }
    });
    Object.keys(PEERS).forEach(key => {
      if (!data[key]) {
        PEERS[key].destruct();
        delete PEERS[key];
      }
    });
  });
}, 100);
