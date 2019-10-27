const CTRLS = {
  left: 'ArrowLeft',
  down: 'ArrowDown',
  up: 'ArrowUp',
  right: 'ArrowRight',
};
const chr = new Character();
const peers = {};
let client;

document.addEventListener('keydown', e => {
  let update;
  switch (e.code) {
    case CTRLS.left:
      chr.addPosX(-1);
      update = true;
      break;
    case CTRLS.down:
      chr.addPosY(1);
      update = true;
      break;
    case CTRLS.up:
      chr.addPosY(-1);
      update = true;
      break;
    case CTRLS.right:
      chr.addPosX(1);
      update = true;
      console.log(client);
      break;
  }
  if (update && client) {
    requestPOST('../php/main.php', {
      requestID: 1,
      clientID: client,
      posX: chr.posX,
      posY: chr.posY
    });
  }
});

requestPOST('../php/main.php', {requestID: 0}, result => { client = result.clientID; });

setInterval(() => requestGET('../php/main.php', data => {
  Object.keys(data).forEach(key => {
    if (peers[key]) {
      peers[key].setPosX(data[key].posX);
      peers[key].setPosY(data[key].posY);
    } else if (key !== client) peers[key] = new Character();
  });
}), 100);
