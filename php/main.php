<?php

function get_chars() {
  $chars = apcu_fetch('chars');
  $chars = $chars !== false ? $chars : [];
  foreach ($chars as $key => $val) {
    if (!isset($val['refresh']) || $val['refresh'] < time() -2) unset($chars[$key]);
  }
  return $chars;
}

function set_chars($chars) {
  apcu_store('chars', $chars);
}

function update_char($client, $pos_x, $pos_y) {
  $chars = get_chars();
  if (!$chars[$client]) $chars[$client] = [];
  if (isset($pos_x)) $chars[$client]['posX'] = $pos_x;
  if (isset($pos_y)) $chars[$client]['posY'] = $pos_y;
  $chars[$client]['refresh'] = time();
  set_chars($chars);
}

function new_char() {
  $chars = get_chars();
  $i = 0;
  while (isset($chars[$i])) $i++;
  $chars[$i] = [refresh => time()];
  set_chars($chars);
  return $i;
}

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $input = (array) json_decode(file_get_contents("php://input"));
    $output = [];

    if ($input['requestID'] === 0) $output['clientID'] = new_char();
    else if ($input['requestID'] === 1) update_char($input['clientID'], $input['posX'], $input['posY']);
    else if ($input['requestID'] === 2) {
      update_char($input['clientID'], null, null);
      $output = get_chars();
    }

    print(json_encode((object) $output));
    break;

  case 'GET':
    print(json_encode((object) get_chars()));
    break;
}
?>
