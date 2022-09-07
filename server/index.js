/**
 * The start point for the node.js webserver. The server serves the frontend
 * for the HCP Surfcam Webserver and maintains and brodcasts the stream of the
 * surf cam to all connections. 
 *
 * @summary Backend for the HCP Surfcam Webserver
 * @author Matthew Kastl
 * 
 * Created at   :   2022-8-22
 */
 

//Webapp setup
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');

//Stream stuff
const Stream = require('node-rtsp-stream');
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const STREAM_PORT = process.env.STREAM_PORT || 3002;
var stream = null;

function startStream(){
    stream = new Stream({
        name: 'surfcam',
        streamUrl: `rtsp://${process.env.AMCREST_USER}:${process.env.AMCREST_PASS}@${process.env.HCP_IP}:${process.env.HCP_RTSP_PORT}/cam/realmonitor?channel=1&subtype=0`,
        wsPort: STREAM_PORT,
        ffmpegOptions: {
            '-stats': '',
            '-r': 30
        }
    });

    stream.on('exitWithError', () => {
        stream.stop();
        assert.fail('videoStream exited with error');
        return done();
    });
}

app.use(express.static(path.resolve(__dirname, '../client/build')));

//serve files
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/stop', (req, res) => {
    console.log("Stop command recieved!");
    stream.stop();
});

app.get('/start', (req, res) => {
    console.log("Start command recieved!");
    startStream();
});

app.get('/test', (req, res) => {
    stream.onSocketConnect();
    //console.log(stream.stream);
});

io.on('connection', (socket) => {
    console.log('====MY SOCKET HAS A CONNECTION====');
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

startStream();
