
import express, { Request, Response } from 'express'
import { resolve } from 'path'

// biblioteca {sender} importdada para o projeto
import Sender from './sender'

const sender = new Sender()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (req: Request, res: Response) => {
    return res.send({
        qr_code: sender.QrCOde,
        connected: sender.isConected
})
})
// TEST DE VERSIONAMENTO COM INTELLIJ IDEA
app.post('/send', async (req: Request, res: Response) => {
    const { number, message } = req.body
    try {
        // validando e tratando o numero do whatsapp
        await sender.sendText(number, message)
            return res.status(200).json()
    } catch (error) {
        console.error('error', error)
        res.status(500).json({status: 'error', message: error})
    }
})

app.listen(5000, () => {
    console.log('server started')
})