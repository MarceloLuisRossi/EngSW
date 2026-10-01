/**
 * Visualizador Interativo - Debugger Linha a Linha do Observer Pattern
 * Implementação em Escala de Cinza com Notação e Comentários UML Profissionais
 */

// --- MODELO CONCEITUAL DO OBSERVER ---

class BinanceAPI {
    getLastPrice() {
        const base = 50000;
        const variations = [-0.15, -0.07, -0.02, 0.005, 0.03, 0.08, 0.22, 0.45];
        const randomVar = variations[Math.floor(Math.random() * variations.length)];
        return Math.floor(base * (1 + randomVar));
    }
}

class BitcoinSubject {
    constructor(price = 50000) {
        this.price = price;
        this.observers = [];
    }

    subscribe(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => {
            if (typeof observer.update === 'function') {
                observer.update(data);
            }
        });
    }

    setPrice(newPrice) {
        if (newPrice !== this.price) {
            const oldPrice = this.price;
            this.price = newPrice;
            this.notify({ oldPrice, newPrice });
        }
    }

    getPrice() {
        return this.price;
    }
}

// --- INSTÂNCIAS E OBSERVERS ---
const binanceAPI = new BinanceAPI();
const bitcoin = new BitcoinSubject(50000);

const observerInstances = {
    logger: {
        id: 'logger',
        name: 'BitcoinPriceLogger',
        cardId: 'obsCardLogger',
        methodId: 'umlMethodLoggerUpdate',
        activeClass: 'active-focus-logger',
        update: ({ oldPrice, newPrice }) => {
            const priceVariation = Math.abs(((newPrice - oldPrice) / oldPrice) * 100);
            return `Log registrado: "Preço alterado de ${oldPrice} para ${newPrice}, variação de ${priceVariation.toFixed(2)}%"`;
        }
    },
    notifier: {
        id: 'notifier',
        name: 'InvestorNotifier',
        cardId: 'obsCardNotifier',
        methodId: 'umlMethodNotifierUpdate',
        activeClass: 'active-focus-notifier',
        update: ({ oldPrice, newPrice }) => {
            const priceVariation = Math.abs(((newPrice - oldPrice) / oldPrice) * 100);
            const isAlert = priceVariation > 5;
            return {
                isAlert,
                variation: priceVariation.toFixed(2),
                log: `[Notificação Usuário] ALERTA: O preço do Bitcoin variou ${priceVariation.toFixed(2)}%! Novo preço: R$ ${newPrice}`
            };
        }
    },
    news: {
        id: 'news',
        name: 'NewsPlatform',
        cardId: 'obsCardNews',
        methodId: 'umlMethodNewsUpdate',
        activeClass: 'active-focus-news',
        update: ({ oldPrice, newPrice }) => {
            const priceVariation = Math.abs(((newPrice - oldPrice) / oldPrice) * 100);
            const isUpdated = priceVariation > 1;
            return {
                isUpdated,
                variation: priceVariation.toFixed(2),
                log: `[Plataforma de Notícias] Preço atualizado no portal de notícias: R$ ${newPrice}`
            };
        }
    }
};

let simulatedNewPrice = 72257;

// --- DEFINIÇÃO COMPLETA DOS PASSOS (34 PASSOS) ---
const DEBUG_STEPS = [
    {
        line: 'L66',
        title: 'Instanciando BinanceAPI',
        desc: 'Linha 66: Cria a instância da API externa de cotações "binanceAPI". A classe surge no diagrama UML.',
        concept: 'Instanciação da classe de serviço BinanceAPI.',
        callStack: ['main() [L66]'],
        scopeVars: ['binanceAPI = BinanceAPI {}'],
        activeCard: 'cardBinance',
        activeColorClass: 'active-focus-binance',
        umlMethod: null,
        minStepForClasses: { binance: true, bitcoin: false, logger: false, notifier: false, news: false },
        action: 'init_binance'
    },
    {
        line: 'L67',
        title: 'Instanciando Bitcoin (Chamada do Constructor)',
        desc: 'Linha 67: Invoca "new Bitcoin()". A classe Bitcoin surge no diagrama e o fluxo salta para a linha 8.',
        concept: 'Instanciação do Subject (Bitcoin).',
        callStack: ['main() [L67]', 'new Bitcoin(price = 50000) [L8]'],
        scopeVars: ['price = 50000 (default)'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'methodConstructor',
        minStepForClasses: { binance: true, bitcoin: true, logger: false, notifier: false, news: false },
        action: 'call_btc_constructor'
    },
    {
        line: 'L9',
        title: 'Bitcoin.constructor: Definindo Preço Inicial',
        desc: 'Linha 9: "this.price = price". Inicializa o estado interno com 50000.',
        concept: 'Atribuição do atributo price (+price: number // R$ 50.000).',
        callStack: ['main() [L67]', 'Bitcoin.constructor() [L9]'],
        scopeVars: ['this.price = 50000'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'umlAttrPrice',
        minStepForClasses: { binance: true, bitcoin: true, logger: false, notifier: false, news: false },
        action: 'set_initial_price'
    },
    {
        line: 'L10',
        title: 'Bitcoin.constructor: Inicializando Array de Observadores',
        desc: 'Linha 10: "this.observers = []". Inicializa a agregação com um array vazio.',
        concept: 'Atributo -observers: Observer[0..*] // [].',
        callStack: ['main() [L67]', 'Bitcoin.constructor() [L10]'],
        scopeVars: ['this.observers = [] (length: 0)'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'umlAttrObservers',
        minStepForClasses: { binance: true, bitcoin: true, logger: false, notifier: false, news: false },
        action: 'init_observers_array'
    },
    {
        line: 'L69',
        title: 'Instanciando BitcoinPriceLogger',
        desc: 'Linha 69: Cria o observador concreto "logger". A classe surge no diagrama UML.',
        concept: 'Instanciação do ConcreteObserver 1.',
        callStack: ['main() [L69]'],
        scopeVars: ['logger = BitcoinPriceLogger {}'],
        activeCard: 'obsCardLogger',
        activeColorClass: 'active-focus-logger',
        umlMethod: null,
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: false, news: false },
        action: 'instantiate_logger'
    },
    {
        line: 'L70',
        title: 'Instanciando InvestorNotifier',
        desc: 'Linha 70: Cria o observador "investorNotifier". A classe surge no diagrama UML.',
        concept: 'Instanciação do ConcreteObserver 2.',
        callStack: ['main() [L70]'],
        scopeVars: ['investorNotifier = InvestorNotifier {}'],
        activeCard: 'obsCardNotifier',
        activeColorClass: 'active-focus-notifier',
        umlMethod: null,
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: false },
        action: 'instantiate_notifier'
    },
    {
        line: 'L71',
        title: 'Instanciando NewsPlatform',
        desc: 'Linha 71: Cria o observador "newsPlatform". A classe surge no diagrama UML.',
        concept: 'Instanciação do ConcreteObserver 3.',
        callStack: ['main() [L71]'],
        scopeVars: ['newsPlatform = NewsPlatform {}'],
        activeCard: 'obsCardNews',
        activeColorClass: 'active-focus-news',
        umlMethod: null,
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'instantiate_news'
    },
    {
        line: 'L73',
        title: 'Inscrição: bitcoin.subscribe(logger)',
        desc: 'Linha 73: Invoca subscribe passando o logger como argumento.',
        concept: 'Chamada do método de registro no Subject.',
        callStack: ['main() [L73]', 'bitcoin.subscribe(logger) [L13]'],
        scopeVars: ['observer = BitcoinPriceLogger'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'methodSubscribe',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'call_subscribe_logger'
    },
    {
        line: 'L14',
        title: 'Bitcoin.subscribe: Inserindo no Array de Observers',
        desc: 'Linha 14: "this.observers.push(observer)". O logger é adicionado ao array de observadores.',
        concept: 'Atualização do atributo -observers // [logger].',
        callStack: ['main() [L73]', 'bitcoin.subscribe() [L14]'],
        scopeVars: ['this.observers.length = 1', 'observers[0] = Logger'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'umlAttrObservers',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'push_logger_to_array'
    },
    {
        line: 'L74',
        title: 'Inscrição: bitcoin.subscribe(investorNotifier)',
        desc: 'Linha 74: Invoca subscribe passando o investorNotifier.',
        concept: 'Inscrição do segundo observador.',
        callStack: ['main() [L74]', 'bitcoin.subscribe(investorNotifier) [L13]'],
        scopeVars: ['observer = InvestorNotifier'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'methodSubscribe',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'call_subscribe_notifier'
    },
    {
        line: 'L14',
        title: 'Bitcoin.subscribe: Inserindo Notifier no Array',
        desc: 'Linha 14: "this.observers.push(observer)". O notifier é adicionado ao array.',
        concept: 'Atualização do atributo -observers // [logger, investorNotifier].',
        callStack: ['main() [L74]', 'bitcoin.subscribe() [L14]'],
        scopeVars: ['this.observers.length = 2', 'observers[1] = Notifier'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'umlAttrObservers',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'push_notifier_to_array'
    },
    {
        line: 'L75',
        title: 'Inscrição: bitcoin.subscribe(newsPlatform)',
        desc: 'Linha 75: Invoca subscribe passando a plataforma de notícias.',
        concept: 'Inscrição do terceiro observador.',
        callStack: ['main() [L75]', 'bitcoin.subscribe(newsPlatform) [L13]'],
        scopeVars: ['observer = NewsPlatform'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'methodSubscribe',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'call_subscribe_news'
    },
    {
        line: 'L14',
        title: 'Bitcoin.subscribe: Inserindo News no Array',
        desc: 'Linha 14: "this.observers.push(observer)". A NewsPlatform entra no array.',
        concept: 'Atualização do atributo -observers // [logger, investorNotifier, newsPlatform].',
        callStack: ['main() [L75]', 'bitcoin.subscribe() [L14]'],
        scopeVars: ['this.observers.length = 3', 'observers[2] = News'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'umlAttrObservers',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'push_news_to_array'
    },
    {
        line: 'L77',
        title: 'Chamada: binanceAPI.getLastPrice()',
        desc: 'Linha 77: Invoca o método da API externa para obter a cotação.',
        concept: 'Execução de método de serviço externo.',
        callStack: ['main() [L77]', 'binanceAPI.getLastPrice() [L2]'],
        scopeVars: ['newPrice = ? (calculando)'],
        activeCard: 'cardBinance',
        activeColorClass: 'active-focus-binance',
        umlMethod: 'umlMethodGetLastPrice',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'call_get_last_price'
    },
    {
        line: 'L3',
        title: 'BinanceAPI: Retornando Novo Preço',
        desc: `Linha 3: "return Math.floor(...)". Retorna o valor de R$ ${simulatedNewPrice.toLocaleString('pt-BR')}.`,
        concept: `Anotação UML: +getLastPrice(): number // => ${simulatedNewPrice.toLocaleString('pt-BR')}.`,
        callStack: ['main() [L77]', 'binanceAPI.getLastPrice() [L3]'],
        scopeVars: [`retorno = ${simulatedNewPrice}`],
        activeCard: 'cardBinance',
        activeColorClass: 'active-focus-binance',
        umlMethod: 'umlMethodGetLastPrice',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'return_price_from_binance'
    },
    {
        line: 'L78',
        title: 'Chamada: bitcoin.setPrice(newPrice)',
        desc: `Linha 78: Envia o novo preço (${simulatedNewPrice}) para o Bitcoin.`,
        concept: 'Início da mutação de estado no Subject.',
        callStack: ['main() [L78]', `bitcoin.setPrice(${simulatedNewPrice}) [L25]`],
        scopeVars: [`newPrice = ${simulatedNewPrice}`, 'this.price = 50000'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'methodSetPrice',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'call_set_price'
    },
    {
        line: 'L26',
        title: 'Bitcoin.setPrice: Verificação if (newPrice !== this.price)',
        desc: `Linha 26: Compara ${simulatedNewPrice} !== 50000. Condição é verdadeira.`,
        concept: 'O Subject valida se houve de fato alteração de preço.',
        callStack: ['main() [L78]', 'bitcoin.setPrice() [L26]'],
        scopeVars: [`${simulatedNewPrice} !== 50000 (true)`],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'methodSetPrice',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'check_price_difference'
    },
    {
        line: 'L27',
        title: 'Bitcoin.setPrice: Gravando Preço Anterior (oldPrice)',
        desc: 'Linha 27: "const oldPrice = this.price". Guarda 50000 em oldPrice.',
        concept: 'Preserva o valor anterior para envio no evento.',
        callStack: ['main() [L78]', 'bitcoin.setPrice() [L27]'],
        scopeVars: ['oldPrice = 50000', `newPrice = ${simulatedNewPrice}`],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'umlAttrPrice',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'save_old_price'
    },
    {
        line: 'L28',
        title: 'Bitcoin.setPrice: Atualizando this.price = newPrice',
        desc: `Linha 28: Atualiza a propriedade "this.price" para ${simulatedNewPrice}.`,
        concept: `Anotação UML: +price: number // R$ ${simulatedNewPrice.toLocaleString('pt-BR')} (Δ ${(Math.abs(((simulatedNewPrice - 50000)/50000)*100)).toFixed(2)}%).`,
        callStack: ['main() [L78]', 'bitcoin.setPrice() [L28]'],
        scopeVars: [`this.price = ${simulatedNewPrice}`, 'oldPrice = 50000'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'umlAttrPrice',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'update_internal_price'
    },
    {
        line: 'L29',
        title: 'Bitcoin.setPrice: Invocando #notify({ oldPrice, newPrice })',
        desc: 'Linha 29: Invoca o método privado "#notify" para notificar os observadores.',
        concept: 'O Subject inicia o broadcast para todos os inscritos.',
        callStack: ['main() [L78]', 'bitcoin.setPrice() [L29]', 'bitcoin.#notify() [L21]'],
        scopeVars: [`data = { oldPrice: 50000, newPrice: ${simulatedNewPrice} }`],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'methodNotify',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'call_private_notify'
    },
    {
        line: 'L22',
        title: 'Bitcoin.#notify: Iniciando loop forEach',
        desc: 'Linha 22: "this.observers.forEach(...)". O loop percorre a lista de observadores.',
        concept: 'Iteração polimórfica sobre a lista de observadores.',
        callStack: ['main() [L78]', 'bitcoin.setPrice() [L29]', 'bitcoin.#notify() [L22]'],
        scopeVars: ['totalObservers = 3', 'loopIndex = 0'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: 'methodNotify',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'start_observers_loop'
    },
    {
        line: 'L22',
        title: 'Loop [0]: Invocando logger.update(data)',
        desc: 'Linha 22: Invoca o método update() do primeiro observador (BitcoinPriceLogger).',
        concept: 'A classe BitcoinPriceLogger passa a ser a classe em execução (ativa).',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'logger.update() [L39]'],
        scopeVars: ['observer = BitcoinPriceLogger', 'oldPrice = 50000', `newPrice = ${simulatedNewPrice}`],
        activeCard: 'obsCardLogger',
        activeColorClass: 'active-focus-logger',
        umlMethod: 'umlMethodLoggerUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'invoke_logger_update'
    },
    {
        line: 'L40',
        title: 'BitcoinPriceLogger: Calculando Variação Percentual',
        desc: 'Linha 40: Calcula "Math.abs(((newPrice - oldPrice) / oldPrice) * 100)".',
        concept: 'Execução interna do método update() no Logger.',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'logger.update() [L40]'],
        scopeVars: [`priceVariation = ${Math.abs(((simulatedNewPrice - 50000)/50000)*100).toFixed(2)}%`],
        activeCard: 'obsCardLogger',
        activeColorClass: 'active-focus-logger',
        umlMethod: 'umlMethodLoggerUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'calc_logger_variation'
    },
    {
        line: 'L42',
        title: 'BitcoinPriceLogger: console.log() executado',
        desc: 'Linha 42: Registra a mensagem de log no Console da Sidebar.',
        concept: 'Conclusão do método update() no Logger.',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'logger.update() [L42]'],
        scopeVars: ['status = Log emitido no Console'],
        activeCard: 'obsCardLogger',
        activeColorClass: 'active-focus-logger',
        umlMethod: 'umlMethodLoggerUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'print_logger_console'
    },
    {
        line: 'L22',
        title: 'Loop [1]: Invocando investorNotifier.update(data)',
        desc: 'Linha 22: O forEach avança para o segundo observador (InvestorNotifier).',
        concept: 'A classe InvestorNotifier passa a ser a classe em execução (ativa).',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'investorNotifier.update() [L47]'],
        scopeVars: ['observer = InvestorNotifier', 'oldPrice = 50000', `newPrice = ${simulatedNewPrice}`],
        activeCard: 'obsCardNotifier',
        activeColorClass: 'active-focus-notifier',
        umlMethod: 'umlMethodNotifierUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'invoke_notifier_update'
    },
    {
        line: 'L48',
        title: 'InvestorNotifier: Calculando Variação Percentual',
        desc: 'Linha 48: Calcula a variação de preço para testar a regra do alerta.',
        concept: 'Execução interna do método update() no InvestorNotifier.',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'investorNotifier.update() [L48]'],
        scopeVars: [`priceVariation = ${Math.abs(((simulatedNewPrice - 50000)/50000)*100).toFixed(2)}%`],
        activeCard: 'obsCardNotifier',
        activeColorClass: 'active-focus-notifier',
        umlMethod: 'umlMethodNotifierUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'calc_notifier_variation'
    },
    {
        line: 'L50',
        title: 'InvestorNotifier: Teste if (priceVariation > 5)',
        desc: `Linha 50: Avalia se ${Math.abs(((simulatedNewPrice - 50000)/50000)*100).toFixed(2)}% > 5%. Condição é verdadeira.`,
        concept: 'Regra condicional do ConcreteObserver avaliada.',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'investorNotifier.update() [L50]'],
        scopeVars: [`${Math.abs(((simulatedNewPrice - 50000)/50000)*100).toFixed(2)} > 5 (true)`],
        activeCard: 'obsCardNotifier',
        activeColorClass: 'active-focus-notifier',
        umlMethod: 'umlMethodNotifierUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'test_notifier_threshold'
    },
    {
        line: 'L51',
        title: 'InvestorNotifier: console.log() do Alerta',
        desc: 'Linha 51: Emite a mensagem de alerta no Console da Sidebar.',
        concept: 'Alerta crítico registrado.',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'investorNotifier.update() [L51]'],
        scopeVars: ['status = Alerta emitido no Console'],
        activeCard: 'obsCardNotifier',
        activeColorClass: 'active-focus-notifier',
        umlMethod: 'umlMethodNotifierUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'send_push_notification'
    },
    {
        line: 'L22',
        title: 'Loop [2]: Invocando newsPlatform.update(data)',
        desc: 'Linha 22: O forEach avança para o terceiro observador (NewsPlatform).',
        concept: 'A classe NewsPlatform passa a ser a classe em execução (ativa).',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'newsPlatform.update() [L57]'],
        scopeVars: ['observer = NewsPlatform', 'oldPrice = 50000', `newPrice = ${simulatedNewPrice}`],
        activeCard: 'obsCardNews',
        activeColorClass: 'active-focus-news',
        umlMethod: 'umlMethodNewsUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'invoke_news_update'
    },
    {
        line: 'L58',
        title: 'NewsPlatform: Calculando Variação Percentual',
        desc: 'Linha 58: Calcula a variação para o portal de notícias.',
        concept: 'Execução interna do método update() no NewsPlatform.',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'newsPlatform.update() [L58]'],
        scopeVars: [`priceVariation = ${Math.abs(((simulatedNewPrice - 50000)/50000)*100).toFixed(2)}%`],
        activeCard: 'obsCardNews',
        activeColorClass: 'active-focus-news',
        umlMethod: 'umlMethodNewsUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'calc_news_variation'
    },
    {
        line: 'L60',
        title: 'NewsPlatform: Teste if (priceVariation > 1)',
        desc: `Linha 60: Avalia se ${Math.abs(((simulatedNewPrice - 50000)/50000)*100).toFixed(2)}% > 1%. Condição é verdadeira.`,
        concept: 'Regra de negócio do portal de notícias avaliada.',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'newsPlatform.update() [L60]'],
        scopeVars: [`${Math.abs(((simulatedNewPrice - 50000)/50000)*100).toFixed(2)} > 1 (true)`],
        activeCard: 'obsCardNews',
        activeColorClass: 'active-focus-news',
        umlMethod: 'umlMethodNewsUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'test_news_threshold'
    },
    {
        line: 'L61',
        title: 'NewsPlatform: console.log() do Portal de Notícias',
        desc: 'Linha 61: Emite a atualização da manchete no Console da Sidebar.',
        concept: 'Atualização do portal de notícias registrada.',
        callStack: ['main() [L78]', 'bitcoin.#notify() [L22]', 'newsPlatform.update() [L61]'],
        scopeVars: ['status = Notícia emitida no Console'],
        activeCard: 'obsCardNews',
        activeColorClass: 'active-focus-news',
        umlMethod: 'umlMethodNewsUpdate',
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'update_news_portal'
    },
    {
        line: 'L30',
        title: 'Fim do #notify() e do setPrice()',
        desc: 'Linha 30: O loop forEach concluiu. Todos os observadores foram sincronizados com sucesso.',
        concept: 'Ciclo completo de notificação do Observer Pattern finalizado.',
        callStack: ['main() [L78]'],
        scopeVars: ['execução concluída'],
        activeCard: 'cardBitcoin',
        activeColorClass: 'active-focus-bitcoin',
        umlMethod: null,
        minStepForClasses: { binance: true, bitcoin: true, logger: true, notifier: true, news: true },
        action: 'finish_execution'
    }
];

// --- ESTADO DA UI ---
let currentStepIndex = 0;
let isAutoPlaying = false;
let autoPlayTimer = null;

// --- ELEMENTOS DO DOM ---
const DOM = {
    btnPrevStep: document.getElementById('btnPrevStep'),
    btnNextStep: document.getElementById('btnNextStep'),
    btnAutoPlay: document.getElementById('btnAutoPlay'),
    btnReset: document.getElementById('btnReset'),
    playIcon: document.getElementById('playIcon'),
    playText: document.getElementById('playText'),
    currentStepBadge: document.getElementById('currentStepBadge'),
    stepNumberBadge: document.getElementById('stepNumberBadge'),
    stepTitle: document.getElementById('stepTitle'),
    stepDescription: document.getElementById('stepDescription'),
    stepKeyConcept: document.getElementById('stepKeyConcept'),
    stepProgressBar: document.getElementById('stepProgressBar'),
    codeContainer: document.getElementById('codeContainer'),
    callStackFrames: document.getElementById('callStackFrames'),
    scopeVariables: document.getElementById('scopeVariables'),
    centralConsoleBody: document.getElementById('centralConsoleBody'),
    logCountBadge: document.getElementById('logCountBadge'),
    
    // Collapsible explanation
    explanationCard: document.getElementById('explanationCard'),
    btnToggleExplanation: document.getElementById('btnToggleExplanation'),
    btnExpandCollapse: document.getElementById('btnExpandCollapse'),
    
    // Classes
    cardBinance: document.getElementById('cardBinance'),
    cardBitcoin: document.getElementById('cardBitcoin'),
    btnTriggerNewPrice: document.getElementById('btnTriggerNewPrice'),
    
    // Inline UML Runtime Comments
    binancePriceComment: document.getElementById('binancePriceComment'),
    btcPriceComment: document.getElementById('btcPriceComment'),
    btcObserversComment: document.getElementById('btcObserversComment'),
    btcNotifyComment: document.getElementById('btcNotifyComment'),
    loggerUpdateComment: document.getElementById('loggerUpdateComment'),
    notifierUpdateComment: document.getElementById('notifierUpdateComment'),
    newsUpdateComment: document.getElementById('newsUpdateComment'),
    
    // Observers cards
    obsCardLogger: document.getElementById('obsCardLogger'),
    obsCardNotifier: document.getElementById('obsCardNotifier'),
    obsCardNews: document.getElementById('obsCardNews'),
    toggleLogger: document.getElementById('toggleLogger'),
    toggleNotifier: document.getElementById('toggleNotifier'),
    toggleNews: document.getElementById('toggleNews')
};

// --- CONTROLE DE VISIBILIDADE DAS CLASSES ---
function updateClassInstantiationVisibility(minStepForClasses) {
    const setClassVisibility = (el, isInstantiated) => {
        if (!el) return;
        if (isInstantiated) {
            el.classList.remove('not-instantiated');
            el.classList.add('is-instantiated');
        } else {
            el.classList.add('not-instantiated');
            el.classList.remove('is-instantiated');
        }
    };

    setClassVisibility(DOM.cardBinance, minStepForClasses.binance);
    setClassVisibility(DOM.cardBitcoin, minStepForClasses.bitcoin);
    setClassVisibility(DOM.obsCardLogger, minStepForClasses.logger);
    setClassVisibility(DOM.obsCardNotifier, minStepForClasses.notifier);
    setClassVisibility(DOM.obsCardNews, minStepForClasses.news);
}

// --- ATUALIZADOR DE COMENTÁRIOS E NOTAÇÕES UML ---
function updateUmlRuntimeComments(stepIndex) {
    const varPct = Math.abs(((simulatedNewPrice - 50000) / 50000) * 100).toFixed(2);
    const varSign = simulatedNewPrice >= 50000 ? '+' : '-';

    // 1. BinanceAPI runtime comment
    if (DOM.binancePriceComment) {
        if (stepIndex >= 14) {
            DOM.binancePriceComment.textContent = `// => ${simulatedNewPrice.toLocaleString('pt-BR')}`;
            DOM.binancePriceComment.classList.remove('hidden');
        } else {
            DOM.binancePriceComment.classList.add('hidden');
        }
    }

    // 2. Bitcoin +price comment
    if (DOM.btcPriceComment) {
        if (stepIndex >= 18) {
            DOM.btcPriceComment.textContent = `// R$ ${simulatedNewPrice.toLocaleString('pt-BR')} (Δ ${varSign}${varPct}%)`;
            DOM.btcPriceComment.classList.remove('hidden');
        } else if (stepIndex >= 2) {
            DOM.btcPriceComment.textContent = `// R$ 50.000`;
            DOM.btcPriceComment.classList.remove('hidden');
        } else {
            DOM.btcPriceComment.classList.add('hidden');
        }
    }

    // 3. Bitcoin -observers comment
    if (DOM.btcObserversComment) {
        if (stepIndex >= 12) {
            const list = [];
            if (DOM.toggleLogger.checked) list.push('logger');
            if (DOM.toggleNotifier.checked) list.push('investorNotifier');
            if (DOM.toggleNews.checked) list.push('newsPlatform');
            DOM.btcObserversComment.textContent = `// [${list.join(', ')}]`;
            DOM.btcObserversComment.classList.remove('hidden');
        } else if (stepIndex >= 10) {
            const list = [];
            if (DOM.toggleLogger.checked) list.push('logger');
            if (DOM.toggleNotifier.checked) list.push('investorNotifier');
            DOM.btcObserversComment.textContent = `// [${list.join(', ')}]`;
            DOM.btcObserversComment.classList.remove('hidden');
        } else if (stepIndex >= 8) {
            const list = [];
            if (DOM.toggleLogger.checked) list.push('logger');
            DOM.btcObserversComment.textContent = `// [${list.join(', ')}]`;
            DOM.btcObserversComment.classList.remove('hidden');
        } else if (stepIndex >= 3) {
            DOM.btcObserversComment.textContent = `// []`;
            DOM.btcObserversComment.classList.remove('hidden');
        } else {
            DOM.btcObserversComment.classList.add('hidden');
        }
    }

    // 4. Bitcoin -#notify comment
    if (DOM.btcNotifyComment) {
        if (stepIndex >= 19 && stepIndex <= 31) {
            DOM.btcNotifyComment.textContent = `// broadcast: { oldPrice: 50000, newPrice: ${simulatedNewPrice} }`;
            DOM.btcNotifyComment.classList.remove('hidden');
        } else if (stepIndex >= 32) {
            DOM.btcNotifyComment.textContent = `// broadcast concluído`;
            DOM.btcNotifyComment.classList.remove('hidden');
        } else {
            DOM.btcNotifyComment.classList.add('hidden');
        }
    }

    // 5. Logger +update comment
    if (DOM.loggerUpdateComment) {
        if (stepIndex >= 21 && stepIndex <= 23) {
            DOM.loggerUpdateComment.textContent = `// executando: log variação ${varPct}%`;
            DOM.loggerUpdateComment.classList.remove('hidden');
        } else if (stepIndex > 23) {
            DOM.loggerUpdateComment.textContent = `// log registrado (${varPct}%)`;
            DOM.loggerUpdateComment.classList.remove('hidden');
        } else {
            DOM.loggerUpdateComment.classList.add('hidden');
        }
    }

    // 6. Notifier +update comment
    if (DOM.notifierUpdateComment) {
        if (stepIndex >= 24 && stepIndex <= 27) {
            DOM.notifierUpdateComment.textContent = `// executando: ${varPct}% > 5% => ALERTA`;
            DOM.notifierUpdateComment.classList.remove('hidden');
        } else if (stepIndex > 27) {
            DOM.notifierUpdateComment.textContent = `// alerta enviado (${varPct}% > 5%)`;
            DOM.notifierUpdateComment.classList.remove('hidden');
        } else {
            DOM.notifierUpdateComment.classList.add('hidden');
        }
    }

    // 7. NewsPlatform +update comment
    if (DOM.newsUpdateComment) {
        if (stepIndex >= 28 && stepIndex <= 31) {
            DOM.newsUpdateComment.textContent = `// executando: ${varPct}% > 1% => notícia atualizada`;
            DOM.newsUpdateComment.classList.remove('hidden');
        } else if (stepIndex > 31) {
            DOM.newsUpdateComment.textContent = `// notícia publicada: R$ ${simulatedNewPrice.toLocaleString('pt-BR')}`;
            DOM.newsUpdateComment.classList.remove('hidden');
        } else {
            DOM.newsUpdateComment.classList.add('hidden');
        }
    }
}

// --- ATUALIZADOR DO CONSOLE CENTRAL DA SIDEBAR ---
function updateCentralConsole(stepIndex) {
    DOM.centralConsoleBody.innerHTML = '';
    const logs = [];
    const varPct = Math.abs(((simulatedNewPrice - 50000) / 50000) * 100).toFixed(2);

    // Passo 23 (L42): Logger console.log
    if (stepIndex >= 23 && DOM.toggleLogger.checked) {
        logs.push({
            type: 'log-logger',
            text: `Log registrado: "Preço alterado de 50000 para ${simulatedNewPrice}, variação de ${varPct}%"`
        });
    }

    // Passo 27 (L51): Notifier console.log
    if (stepIndex >= 27 && DOM.toggleNotifier.checked) {
        if (parseFloat(varPct) > 5) {
            logs.push({
                type: 'log-notifier',
                text: `[Notificação Usuário] ALERTA: O preço do Bitcoin variou ${varPct}%! Novo preço: R$ ${simulatedNewPrice}`
            });
        }
    }

    // Passo 31 (L61): NewsPlatform console.log
    if (stepIndex >= 31 && DOM.toggleNews.checked) {
        if (parseFloat(varPct) > 1) {
            logs.push({
                type: 'log-news',
                text: `[Plataforma de Notícias] Preço atualizado no portal de notícias: R$ ${simulatedNewPrice}`
            });
        }
    }

    if (logs.length === 0) {
        DOM.centralConsoleBody.innerHTML = '<div class="term-line prompt">> Aguardando console.log()...</div>';
        DOM.logCountBadge.textContent = '0 logs';
    } else {
        DOM.logCountBadge.textContent = `${logs.length} ${logs.length === 1 ? 'log' : 'logs'}`;
        logs.forEach(log => {
            const item = document.createElement('div');
            item.className = `term-line log-item ${log.type}`;
            item.textContent = log.text;
            DOM.centralConsoleBody.appendChild(item);
        });
        DOM.centralConsoleBody.scrollTop = DOM.centralConsoleBody.scrollHeight;
    }
}

// --- RENDERIZAÇÃO DO PASSO LINHA A LINHA ---
function renderStep(stepIndex) {
    const step = DEBUG_STEPS[stepIndex];
    if (!step) return;

    // 1. Atualiza Barra de Progresso
    const progressPct = ((stepIndex + 1) / DEBUG_STEPS.length) * 100;
    DOM.stepProgressBar.style.width = `${progressPct}%`;

    // 2. Atualiza Badges e Textos
    DOM.currentStepBadge.textContent = `${stepIndex + 1} / ${DEBUG_STEPS.length} (${step.line})`;
    DOM.stepNumberBadge.textContent = stepIndex + 1;
    DOM.stepTitle.textContent = `${step.line}: ${step.title}`;
    DOM.stepDescription.textContent = step.desc;
    DOM.stepKeyConcept.innerHTML = `<strong>Conceito:</strong> ${step.concept}`;

    // 3. Atualiza Botões
    DOM.btnPrevStep.disabled = (stepIndex === 0);
    DOM.btnNextStep.disabled = (stepIndex === DEBUG_STEPS.length - 1);

    // 4. Controla Visibilidade das Classes
    updateClassInstantiationVisibility(step.minStepForClasses);

    // 5. Destaque no Código
    document.querySelectorAll('.code-line').forEach(line => line.classList.remove('active-code-line'));
    const activeLineEl = document.getElementById(step.line);
    if (activeLineEl) {
        activeLineEl.classList.add('active-code-line');
        activeLineEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 6. Atualiza Call Stack
    DOM.callStackFrames.innerHTML = '';
    step.callStack.forEach((frame, idx) => {
        const frameEl = document.createElement('span');
        frameEl.className = `stack-frame ${idx === step.callStack.length - 1 ? 'active-frame' : ''}`;
        frameEl.textContent = frame;
        DOM.callStackFrames.appendChild(frameEl);
    });

    // 7. Atualiza Variáveis de Escopo
    DOM.scopeVariables.innerHTML = '';
    step.scopeVars.forEach(v => {
        const varEl = document.createElement('span');
        varEl.className = 'scope-tag';
        varEl.textContent = v;
        DOM.scopeVariables.appendChild(varEl);
    });

    // 8. Atualiza o Console Centralizado na Sidebar
    updateCentralConsole(stepIndex);

    // 9. Atualiza as anotações/comentários inline no Diagrama UML
    updateUmlRuntimeComments(stepIndex);

    // 10. Cores Neutras: remove destaques anteriores
    const allCards = [DOM.cardBinance, DOM.cardBitcoin, DOM.obsCardLogger, DOM.obsCardNotifier, DOM.obsCardNews];
    allCards.forEach(c => {
        if (c) {
            c.classList.remove(
                'active-focus-bitcoin',
                'active-focus-binance',
                'active-focus-logger',
                'active-focus-notifier',
                'active-focus-news'
            );
        }
    });
    document.querySelectorAll('.uml-member').forEach(m => m.classList.remove('active-method'));

    // 11. Destaca com borda monocromática de alto contraste a classe ativa no step
    if (step.activeCard && step.activeColorClass) {
        const activeCardEl = document.getElementById(step.activeCard);
        if (activeCardEl) {
            activeCardEl.classList.add(step.activeColorClass);
        }
    }

    if (step.umlMethod) {
        const method = document.getElementById(step.umlMethod);
        if (method) method.classList.add('active-method');
    }
}

// --- NAVEGAÇÃO ---
function nextStep() {
    if (currentStepIndex < DEBUG_STEPS.length - 1) {
        currentStepIndex++;
        renderStep(currentStepIndex);
    } else {
        stopAutoPlay();
    }
}

function prevStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStep(currentStepIndex);
    }
}

function resetSimulation() {
    stopAutoPlay();
    currentStepIndex = 0;
    renderStep(0);
}

function toggleAutoPlay() {
    if (isAutoPlaying) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
}

function startAutoPlay() {
    isAutoPlaying = true;
    DOM.playText.textContent = 'Pausar';
    DOM.btnAutoPlay.classList.add('btn-primary');
    DOM.btnAutoPlay.classList.remove('btn-accent');

    if (currentStepIndex === DEBUG_STEPS.length - 1) {
        currentStepIndex = 0;
        renderStep(0);
    }

    autoPlayTimer = setInterval(() => {
        if (currentStepIndex < DEBUG_STEPS.length - 1) {
            nextStep();
        } else {
            stopAutoPlay();
        }
    }, 1200);
}

function stopAutoPlay() {
    isAutoPlaying = false;
    DOM.playText.textContent = 'Auto';
    DOM.btnAutoPlay.classList.remove('btn-primary');
    DOM.btnAutoPlay.classList.add('btn-accent');
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
}

// --- TECLAS DE ATALHO ---
function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'F10') {
            e.preventDefault();
            nextStep();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevStep();
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            toggleAutoPlay();
        }
    });
}

// --- TOGGLES DE OBSERVERS ---
function setupObserverToggles() {
    DOM.toggleLogger.addEventListener('change', (e) => {
        if (e.target.checked) {
            bitcoin.subscribe(observerInstances.logger);
        } else {
            bitcoin.unsubscribe(observerInstances.logger);
        }
        updateUmlRuntimeComments(currentStepIndex);
        updateCentralConsole(currentStepIndex);
    });

    DOM.toggleNotifier.addEventListener('change', (e) => {
        if (e.target.checked) {
            bitcoin.subscribe(observerInstances.notifier);
        } else {
            bitcoin.unsubscribe(observerInstances.notifier);
        }
        updateUmlRuntimeComments(currentStepIndex);
        updateCentralConsole(currentStepIndex);
    });

    DOM.toggleNews.addEventListener('change', (e) => {
        if (e.target.checked) {
            bitcoin.subscribe(observerInstances.news);
        } else {
            bitcoin.unsubscribe(observerInstances.news);
        }
        updateUmlRuntimeComments(currentStepIndex);
        updateCentralConsole(currentStepIndex);
    });
}

// --- TOGGLE DO PAINEL DE EXPLICAÇÃO RETRÁTIL ---
function setupExplanationToggle() {
    const toggle = () => {
        DOM.explanationCard.classList.toggle('collapsed');
    };

    if (DOM.btnToggleExplanation) {
        DOM.btnToggleExplanation.addEventListener('click', toggle);
    }
}

// --- GATILHO DE PREÇO BINANCE ---
function setupRandomPriceTrigger() {
    if (DOM.btnTriggerNewPrice) {
        DOM.btnTriggerNewPrice.addEventListener('click', () => {
            simulatedNewPrice = binanceAPI.getLastPrice();
            if (currentStepIndex >= 14) {
                renderStep(currentStepIndex);
            }
        });
    }
}

// --- INICIALIZAÇÃO GERAL ---
function initApp() {
    DOM.btnNextStep.addEventListener('click', nextStep);
    DOM.btnPrevStep.addEventListener('click', prevStep);
    DOM.btnAutoPlay.addEventListener('click', toggleAutoPlay);
    DOM.btnReset.addEventListener('click', resetSimulation);

    setupObserverToggles();
    setupExplanationToggle();
    setupRandomPriceTrigger();
    setupKeyboardShortcuts();

    renderStep(0);
}

document.addEventListener('DOMContentLoaded', initApp);
