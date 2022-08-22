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
 
/** jshint {inline configuration here} */

const express = require('express');
const Stream = require('node-rtsp-stream');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const STREAM_PORT = process.env.STREAM_PORT || 3002;

app = express();
stream = new Stream({
    name: 'surfcam',
    streamUrl: `rtsp://${process.env.AMCREST_USER}:${process.env.AMCREST_PASS}@166.203.202.132:554/cam/realmonitor?channel=1&subtype=0`,
    wsPort: STREAM_PORT,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30
    }
});

console.log(`rtsp://${process.env.AMCREST_USER}:${process.env.AMCREST_PASS}@166.203.202.132:554/cam/realmonitor?channel=1&subtype=0`);

stream.on('exitWithError', () => {
    stream.stop();
    assert.fail('videoStream exited with error');
    return done();
  });

app.get('/api', (req, res) => {
    res.json({message: "Hello from server!"});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
