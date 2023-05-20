import React, {useState} from 'react';
import {AutoComplete, AutoCompleteCompleteEvent} from "primereact/autocomplete";
import allItems from './items.json';
import ItemMarketDetails from "./ItemMarketDetails";
import {useAsync, useAsyncFn} from "react-use";
import {ProgressSpinner} from "primereact/progressspinner";
import {MarketItemData} from "./MarketItemData";
import {Item} from "./Item";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";

function App() {
    const [region, setRegion] = useState(localStorage.region ?? 'East');
    const [value, setValue] = useState<Item[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    const search = (event: AutoCompleteCompleteEvent) => {
        const suggestions = [];
        for (const item of allItems as Item[]) {
            if (!item.LocalizedNames) {
                continue;
            }

            if (item.LocalizedNames['EN-US'].toLowerCase().includes(event.query.toLowerCase())) {
                suggestions.push(item);
            } else if (item.UniqueName.toLowerCase().includes(event.query.toLowerCase())) {
                suggestions.push(item);
            }
        }
        setItems(suggestions);
    }

    const template = (item: Item) => {
        return (
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <img src={`https://render.albiononline.com/v1/item/${item.UniqueName}?size=32`} alt={item.LocalizedNames?.['EN-US']} />
                {item.LocalizedNames?.['EN-US']}
            </div>
        )
    }

    const selectedTemplate = (item: Item) => {
        return (
            <span>{item.LocalizedNames?.['EN-US']}</span>
        )
    }

    const [marketData, doSearch] = useAsyncFn(async () => {
        if (value.length === 0) {
            return [];
        }

        const search = value.map(item => item.UniqueName).join(',');

        const res = await fetch(`https://${region.toLowerCase()}.albion-online-data.com/api/v2/stats/prices/${search}`);
        return await res.json() as MarketItemData[];
    }, [value, region]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <div className="p-inputgroup">
                <Dropdown style={{flexGrow: 0, width: '150px', borderRight: 'none'}} options={['East', 'West']} value={region} onChange={(e) => {
                    localStorage.setItem('region', e.value);
                    setRegion(e.value);
                }} />
                <AutoComplete multiple value={value} suggestions={items} completeMethod={search}
                              onChange={(e) => setValue(e.value)}
                              itemTemplate={template} selectedItemTemplate={selectedTemplate} />
                <Button onClick={doSearch}>Search</Button>
            </div>

            {marketData.loading || !marketData.value
                ? !marketData.value ? <span/> : <ProgressSpinner />
                : value.map(item => (
                    <ItemMarketDetails key={item.UniqueName} item={item} market={marketData.value?.filter(i => i.item_id === item.UniqueName)} />
                ))
            }

            <footer>This tool is not affiliated with Albion Online or Sandbox Interactive GmbH</footer>
        </div>
    );
}

export default App;
