import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { Coin, MarketData } from "./api";

type Series = {
    label: string
    data: MarketData[]
    secondaryAxisId?: string
}
function PriceChart(props: Coin) {
    const randomBought = [...props.marketData].sort(() => 0.5 - Math.random()).splice(0, 20).sort((a,b) => a.date.getTime() - b.date.getTime())

    const data: Series[] = [
        {
            label: props.name,
            data: props.marketData
        },
        {
            label: "currentPrice",
            data: props.marketData.map(md => ({ ...md, price: props.marketData[props.marketData.length - 1].price }))
        },
        {
            label: "bought",
            data: randomBought,
            secondaryAxisId: "2",

        }
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
            {
                id: "2",
                getValue: md => md.price,
                showDatumElements: true,
                // styles: (() => { console.log((this.styles as any)); return { } })()
            }
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
                    getDatumStyle: (datum, status) => datum.secondaryAxisId ? { 
                        circle: {
                            r: 15,
                            // color: "yellow",
                            stroke: "yellow"
                        },
                        stroke: "black",
                        rectangle: {
                            stroke: "green"
                        },
                        path: {
                            stroke: "yellow"
                        }  
                    } : { }
                }}
            />
        </>
    ) : <></>
}

export default PriceChart;