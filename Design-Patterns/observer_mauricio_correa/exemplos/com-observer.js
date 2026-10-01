class BinanceAPI {
    getLastPrice() {
        return Math.floor(Math.random() * 100000)
    }
}

class Bitcoin {
    constructor(price = 50000) {
        this.price = price
        this.observers = []
    }

    subscribe(observer) {
        this.observers.push(observer)
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer)
    }

    #notify(data) {
        this.observers.forEach(observer => observer.update(data))
    }

    setPrice(newPrice) {
        if (newPrice !== this.price) {
            const oldPrice = this.price
            this.price = newPrice
            this.#notify({ oldPrice, newPrice })
        }
    }

    getPrice() {
        return this.price
    }
}

class BitcoinPriceLogger {
    update({ oldPrice, newPrice }) {
        const priceVariation = Math.abs(((newPrice - oldPrice) / oldPrice) * 100)

        console.log(`Log registrado: "Preço alterado de ${oldPrice} para ${newPrice}, variação de ${priceVariation.toFixed(2)}%"`)
    }
}

class InvestorNotifier {
    update({ oldPrice, newPrice }) {
        const priceVariation = Math.abs(((newPrice - oldPrice) / oldPrice) * 100)

        if (priceVariation > 5) {
            console.log(`[Notificação Usuário] ALERTA: O preço do Bitcoin variou ${priceVariation.toFixed(2)}%! Novo preço: R$ ${newPrice}`)
        }
    }
}

class NewsPlatform {
    update({ oldPrice, newPrice }) {
        const priceVariation = Math.abs(((newPrice - oldPrice) / oldPrice) * 100)

        if (priceVariation > 1) {
            console.log(`[Plataforma de Notícias] Preço atualizado no portal de notícias: R$ ${newPrice}`)
        }
    }
}

const binanceAPI = new BinanceAPI()
const bitcoin = new Bitcoin()

const logger = new BitcoinPriceLogger()
const investorNotifier = new InvestorNotifier()
const newsPlatform = new NewsPlatform()

bitcoin.subscribe(logger)
bitcoin.subscribe(investorNotifier)
bitcoin.subscribe(newsPlatform)

const newPrice = binanceAPI.getLastPrice()
bitcoin.setPrice(newPrice)