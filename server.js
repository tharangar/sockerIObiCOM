let express = require('express')

let path = require('path')

let app = express()

let server = require('http').Server(app)

let io = require('socket.io')(server)

let docker = require('./dockerapi')

// Use the environment port if available, or default to 4040

let port = process.env.PORT || 4040

let sequenceNumberByClient = new Map();

// Serve static files from /public
app.use(express.static('public'))

// Create an endpoint which just returns the index.html page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

// Start the server
server.listen(port, () => console.log(`Server started on port ${port}`))


// run commands: use it with Promises:-------------------------------------------
var Promise = require("bluebird");
global.Promise = require('bluebird');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function ls() {

  // No unhandled rejection!
  //await Promise.reject(new Error('test'));

  //const { stdout, stderr } = await exec('ls');
  const { stdout, stderr } = await exec('docker exec emailserver freshclam');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  io.emit('containers.data', stdout+' ERR - '+stderr)
}

//--------------------------------------------------------------------------------

// Refresh all docker containers and send container data to socker.io clients ----
function refreshContainers() {
    console.log('working')
    docker.listContainers({ all: true}, (err, containers) => {
        io.emit('containers.list', containers)
    })
}

//---------------------------------------------------------------------------------

// this commadn is written to output shell commands outputs.
function exicuteShell() {

    console.info("Shell Exicuting")
    //ls().catch(() => {console.log('Error')});

    // Prints "false"
    console.log(ls().catch(err => {console.log('caught', err.message);}) instanceof require('bluebird'))
    //io.emit('containers.data', ls())
}

// docerode libry details : https://github.com/apocas/dockerode
// https://github.com/apocas/dockerode/blob/master/examples/exec_running_container.js

//setInterval(refreshContainers, 2000)



io.on('connection', socket => {

    setInterval(refreshContainers, 50000) // Refreshing containers and emit to clinets
    setInterval(exicuteShell, 25000) // exicute shell and sedn data to clients

    // sends each client its current sequence number

//setInterval(() => {
    //for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        //socket.emit("seq-num", 'sdf');
        //io.emit('containers.data', 'dadad')
        //exicuteShell()
        //socket.emit('image.error', '2323')
        //sequenceNumberByClient.set(client, sequenceNumber + 1 );
    //}
//}, 20000);



    socket.on('containers.list', () => {
        refreshContainers()
        console.info('containers refreshed')
    })

    socket.on('container.start', args => {
        const container = docker.getContainer(args.id)

        if (container) {
            container.start((err, data) => refreshContainers())
        }
    })

    socket.on('container.stop', args => {
        const container = docker.getContainer(args.id)

        if (container) {
            container.stop((err, data) => refreshContainers())
        }
    })

    socket.on('containers.data', () => {
        exicuteShell()
        console.log("shell exicuting started")
     

        //if (container) {
        //container.exec((err, data) => refreshContainers())
        //console.log("mehtod run")
        //container.exec({'/bin/bash'})
        //}
        
    })


    socket.on('image.run', args => {
        docker.createContainer({ Image: args.name }, (err, container) => {
            if (!err)
                container.start((err, data) => {
                    if (err)
                        socket.emit('image.error', { message: err })
                })
            else
                socket.emit('image.error', { message: err })
        })
    })

})