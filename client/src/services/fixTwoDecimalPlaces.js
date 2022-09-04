export default function fixTwoDecimalPlaces(itemPrice) {
    const price = String(itemPrice)
    if (!price.includes(".")) return price + ".00"
    if (new RegExp(/\.\d$/).test(price)) return price + "0"
    return price
}