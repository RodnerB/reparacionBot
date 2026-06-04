const { Client} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

// crear una instancia del cliente
const client = new Client()

// escuchar el evento 'ready' para saber cuándo el cliente está listo
client.on('ready', () => {
    console.log('El cliente esta listo')
})

// generar el código QR para la autenticación
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
})

client.initialize()