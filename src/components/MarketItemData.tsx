/*
itemTypeId	string
nullable: true
city	string
nullable: true
qualityLevel	integer($int32)
sellPriceMin	integer($int64)
sellPriceMinDate	string($date-time)
sellPriceMax	integer($int64)
sellPriceMaxDate	string($date-time)
buyPriceMin	integer($int64)
buyPriceMinDate	string($date-time)
buyPriceMax	integer($int64)
buyPriceMaxDate	string($date-time)
 */
export interface MarketItemData {
    item_id: string,
    city: string,
    sell_price_min: number,
    sell_price_min_date: string,
    sell_price_max: number,
    sell_price_max_date: string,
}