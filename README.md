# PHP MOVING CELLS
php realtime caching demo

![thumbnail.png](thumbnail.png)

JavaScript is written in ES6  
PHP extension apcu required


>     js/
>       character.js -- class Character
>         used for client's own cell and for peers cells
> 
>       request.js -- requestPOST() & requestGET()
>         for fetching JSON data with input and without
> 
>       main.js
>         handles client input and requests to main.php

>     php/
>       main.php
>         interface for fetching and storing cell positions
>         GET request returns json file containing active clients, their positions and last update server time
>         POST request returns json file depending on input's requestID
>           requestID: 0 -- books and returns a clientID
>           requestID: 1 -- stores client's cell position to server cache
>           requestID: 2 -- returns active clients' cell positions and reminds the server that the requesting client is active
