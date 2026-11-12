const express = require('express');
const PORT = 3000
const sequelize= require('./Database/database')
const productRouter = require('./routes/productRouter')
const app = express();


app.use(express.json());
app.use(productRouter)

const newConnection = async ()=> {
  try{
    await sequelize.authenticate()
    console.log('Database connected')
  }catch (err) {
    console.error(err.message)
  }
}

newConnection()

app.listen(PORT, ()=> {
    console.log(`server is running on PORT: ${PORT}`)
})