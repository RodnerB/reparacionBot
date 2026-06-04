const { Client, LocalAuth} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

// crear una instancia del cliente
const client = new Client({
    authStrategy: new LocalAuth(),

    puppeteer: {
        executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
        headless: false,
        args: ['--no-sandbox']
    }
})


// escuchar el evento 'ready' para saber cuándo el cliente está listo
client.on('ready', async () => {
    console.log('El cliente esta listo')

    await client.sendMessage(
        '8297422921@c.us',
        'Prueba bot'
    )
})

// generar el código QR para la autenticación
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
})

client.on('message_create', async (message) => {

    const chat = await message.getChat()

    console.log(chat.name)
    if(chat.name.toLocaleLowerCase() != 'reparación') return

    if(message.body.toLowerCase().includes('listo')){

        const tel = message.body.match(/(809|829|849)[-\s]?\d{3}[-\s]?\d{4}/)?.[0] // Extraer el número de teléfono del mensaje
        const cost = message.body.match(/\$[\d,]+/)?.[0] // Extraer el costo del mensaje

        const telLimpio = tel.replace(/[-\s]/g, '')// Limpiar el número de teléfono
        
        const contacto = `${telLimpio}@c.us`

        const numeroExiste = await client.isRegisteredUser(contacto)

        if(!numeroExiste){
            console.log('El numero no esta registrado en whatsapp')
            return
        }

        await client.sendMessage(contacto, `Hola, tu equipo ya esta listo, el costo de la reparación es de ${cost}`)
    }
    
})

client.initialize()