const WebSocket = require('ws');

const createChatServer = server => {
    const wsServer = new WebSocket.Server({server});

    const map = new Map();

    wsServer.on('connection', (ws, req)=>{
        map.set(ws, {name:''});

        ws.on('message', message =>{
            const mObj = map.get(ws);
            let msg;
            if(! mObj.name){
                mObj.name = message;
                msg = `${mObj.name} 進入, 共 ${wsServer.clients.size} 人`;
            } else {
                msg = `${mObj.name}: ${message}`;
            }

            wsServer.clients.forEach( c => {
                if(c.readyState===WebSocket.OPEN){
                    c.send(msg);
                }
            });
        });
    });
};

module.exports = createChatServer;