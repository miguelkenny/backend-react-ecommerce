//Nodemailer
import { createTransport } from 'nodemailer'
import {config} from 'dotenv'

config()

const adminEmail = process.env.ADMIN_EMAIL

const sendInfoEmail = async (body, option) => {

    const transport = createTransport({
        service: 'gmail',
        port: '587',
        auth: {
            user: adminEmail,
            pass: 'cslhvbpzxonzuegb'
        }
    })

    function sendInfoRegisterOrSale(option) {
        switch (option) {
            case 1:
                return `Datos de Nuevo Usuario Registrado:
                ${JSON.stringify(body.cart)}`

            case 2:
                const cart = body.cart
                return `
                <div style="text-align:center;">
                    <h1>Datos de Nueva Venta:</h1>
                    <h2>Productos</h2>    
                    <h3>Nombre: ${cart.products.map(product => product.title + " ")}</h3>
                    <h3>Color: ${cart.products.map(product => product.color + " ")}</h3>
                    <h3>Precio: ${cart.products.map(product => product.price)}</h3>
                    <h3>Cantidad: ${cart.quantity}</h3>
                    <h3>Total: ${cart.total}</h3>
                </div>`
            default:
                break;
        }
    }

    const mailOptions = {
        from: 'Women Shop',
        to: `${adminEmail}`,
        subject: option === 1 ? 'Nuevo Registro' : 'Nueva Venta Generada',
        html: sendInfoRegisterOrSale(option)
    }
    try {
        await transport.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
    }
}

export default sendInfoEmail