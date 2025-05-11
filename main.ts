import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'

const wwclient : Client = new Client (
    {
        authStrategy : new LocalAuth (
            {
                dataPath : ""
            }
        )
    }
)