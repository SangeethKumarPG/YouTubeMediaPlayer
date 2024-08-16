// import the json server
const jsonServer = require('json-server')

// create server using create()
const mediaPlayerServer = jsonServer.create()

// create a path/route to db.json file
const router = jsonServer.router('db.json')

// create a middleware 
const middleware = jsonServer.defaults()

// add middleware and router to media player server
mediaPlayerServer.use(middleware)
mediaPlayerServer.use(router)

const PORT = 4000

// run the server
mediaPlayerServer.listen(PORT, ()=>{
    console.log("Media Player Server running on port : ",PORT)
})