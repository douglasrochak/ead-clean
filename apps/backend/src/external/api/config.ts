import express from 'express';
import cors from 'cors';

const port = process.env.API_PORT ?? 3003;
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

export default app;
