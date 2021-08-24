import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { Coin, MarketData } from "./api";

type Series = {
    label: string
    data: MarketData[]
}
function PriceChart(props: Coin) {
    const randomBought = [ ...props.marketData ].sort(() => 0.5 - Math.random()).splice(0, 5).map(rb => ({ label: "Bought on " + rb.date.toDateString(), data: [rb] } as Series))
    // console.log(randomBought)
    const data: Series[] = [
        {
            label: props.name,
            data: props.marketData
        },
        {
            label: "currentPrice",
            data: props.marketData.map(md => ({ ...md, price: props.marketData[props.marketData.length - 1].price}))
        },
        ...randomBought
    ]
    const primaryAxis = React.useMemo(
        (): AxisOptions<MarketData> => ({
            getValue: md => md.date,
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<MarketData>[] => [
            {
                getValue: md => md.price,
            },
        ],
        []
    )

    return data ? (
        <>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                    getDatumStyle: (datum, status) => 
                        status == "none" ? ({
                            circle: {
                                r: 10
                            }
                        }) : (() => { return ({} as any) })(),
                    getSeriesStyle: (series, status) => 
                        series.label.indexOf("Bought") ? ({ circle: { r: 20 }}) : ({} as any)
                }}
            />
        </>
    ) : <></>
}

export default PriceChart;