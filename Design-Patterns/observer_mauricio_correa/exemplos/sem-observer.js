class BinanceAPI {
    getLastPrice() {
        return Math.floor(Math.random() * 100000)
    }
}

class Bitcoin {
    constructor(price = 50000) {
        this.price = price
    }

    setPrice(newPrice) {
        if (newPrice !== this.price) {
            this.price = newPrice
        }
    }

    getPrice() {
        return this.price
    }
}

const binanceAPI = new BinanceAPI()
const bitcoin = new Bitcoin()

const currentPrice = bitcoin.getPrice()
const newPrice = binanceAPI.getLastPrice()

if (currentPrice !== newPrice) {
    console.log(`Log registrado: "Preço alterado de ${currentPrice} para ${newPrice}"`)

    const priceVariation = Math.abs(((newPrice - currentPrice) / currentPrice) * 100)

    if (priceVariation > 5) {
        console.log(`[Notificação Usuário] ALERTA: O preço do Bitcoin variou ${priceVariation.toFixed(2)}%! Novo preço: R$ ${newPrice}`)
    }

    if (priceVariation > 1) {
        console.log(`[Plataforma de Notícias] Preço atualizado no portal de notícias: R$ ${newPrice}`)
    }

    bitcoin.setPrice(newPrice)
}