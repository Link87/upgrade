import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import LoginGateway from './LoginGateway';
import RestGateway from './RestGateway';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); // Insecure af
app.use(helmet());

export class HttpGateway {

    constructor (restGateway: RestGateway, loginGateway: LoginGateway) {
        const router = express.Router();
        router.use('/api', restGateway.getRouter());
        router.use('/auth', loginGateway.getRouter());

        app.get('/test', (_req, res) => {
          res.send(`<!doctype html>
          <html>
            <head>
              <title>Socket.IO chat</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font: 13px Helvetica, Arial; }
                form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
                form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
                form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
                #messages { list-style-type: none; margin: 0; padding: 0; }
                #messages li { padding: 5px 10px; }
                #messages li:nth-child(odd) { background: #eee; }
              </style>
              <script src="/socket.io/socket.io.js"></script>
              <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
              <script>
                $(function () {
                  var socket = io();
                  $('form').submit(function(e){
                    e.preventDefault(); // prevents page reloading
                    socket.emit('chat message', $('#m').val());
                    $('#m').val('');
                    return false;
                  });
                  socket.on('chat message', function(msg){
                    $('#messages').append($('<li>').text(msg));
                  });
                  socket.on('error', function(err) {
                    $('#messages').append($('<li style=\"color: red\">').text(err));
                    console.log(err);
                  });
                });
              </script>
            </head>
            <body>
              <ul id="messages"></ul>
              <form action="">
                <input id="m" autocomplete="off" /><button>Send</button>
              </form>
            </body>
          </html>`);
        });
        app.use('/', router);
    }

    public async listen(port: number) {
      return app.listen(port, () => {
        console.log(`Started app at port ${port}`);
      });
    }

}

export default HttpGateway;
