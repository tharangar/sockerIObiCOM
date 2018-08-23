let express = require('express')

let path = require('path')

let app = express()

let server = require('http').Server(app)

let io = require('socket.io')(server)

let docker = require('./dockerapi')

// Use the environment port if available, or default to 4040

let port = process.env.PORT || 4040

// Serve static files from /public
app.use(express.static('public'))

// Create an endpoint which just returns the index.html page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

// Start the server
server.listen(port, () => console.log(`Server started on port ${port}`))

function refreshContainers() {
    docker.listContainers({ all: true}, (err, containers) => {
        io.emit('containers.list', containers)
    })
}

// docerode libry details : https://github.com/apocas/dockerode
// https://github.com/apocas/dockerode/blob/master/examples/exec_running_container.js

setInterval(refreshContainers, 2000)

io.on('connection', socket => {

    setInterval(refreshContainers, 10000)

    socket.on('containers.list', () => {
        refreshContainers()
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

    socket.on('container.data', args => {
        const container = docker.getContainer(args.id)

        if (container) {
            container.exec((err, data) => refreshContainers())
            console.log("mehtod run")
            //container.exec({'/bin/bash'})
        }
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