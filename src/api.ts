
export type MarketData = {
    price: number
    date: Date
}

export type Coin = {
    name: string
    marketData: MarketData[]
}

export let getCoinData = async (coin: string): Promise<Coin> => {
    let days = (new Date().getTime() - new Date('01/01/2021').getTime()) / (1000 * 3600 * 24)
    let response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=eur&days=${days}`)
    let result = await response.json()

    let marketCharts = result.prices.map((p: any) => {
        let epoch = p[0]
        if (epoch < 10000000000)
            epoch *= 1000;
        epoch += (new Date().getTimezoneOffset() * -1);
        let date = new Date(epoch);

        return { coin: { name: "btc" }, price: p[1], date: date } as MarketData
    }) as Array<MarketData>;

    marketCharts.sort((a, b) => a.date.getTime() - b.date.getTime())

    return {
        name: coin,
        marketData: marketCharts
    };
}

