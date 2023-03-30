const app = require('./app')

const startServer = () => {
  const PORT = 3434

  app.listen(PORT, () => {
    console.log('server start in PORT ', PORT)
  })
}

startServer()