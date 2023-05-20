import {Card} from "primereact/card";
import {Item} from "./Item";
import {MarketItemData} from "./MarketItemData";
import {Message} from "primereact/message";

function CityValue({market}: {market: MarketItemData}) {
    return (
        <tr>
            <th style={{textAlign: 'left'}}>{market.city}</th>
            <td>{market.sell_price_min} - {market.sell_price_max}</td>
        </tr>
    )
}

export default function ItemMarketDetails({item, market}: {item: Item, market: MarketItemData[]|undefined|null}) {
    return (
        <Card title={item.LocalizedNames?.['EN-US']}>
            {market
                ? <table>
                    {market.map(cityData => (<CityValue key={cityData.city} market={cityData} />))}
                </table>
                : <Message severity={'error'} text={'Failed to fetch market data'} />
            }
        </Card>
    )
}