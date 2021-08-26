const http = require('http'); // #include ou using

const server = http.createServer((request, response) => {
    response.statusCode = 200;                          // Ca a fonctionné
    response.setHeader('Content-Type','text/plain');    // Ceci est comment je vais te l'envoyer
    response.end('Bonjour mon premier serveur');        // Voici le 'content'

    console.log(request.url);
});

server.listen(2899, '127.0.0.1', () => {
    console.log('Le serveur est démaré');
});