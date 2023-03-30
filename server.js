const app = require('./app')

const connDB = require('./utils/database')

const startServer = () => {
  const PORT = 3434

  app.listen(PORT, () => {
    connDB()
    console.log('server start in PORT ', PORT)
  })
}

startServer()