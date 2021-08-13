import data from "../../assets/airports-india.json";

export default function (name) {
   const _city = data.filter(c => {
        if (c.city === name) {
            return c.iataCode
        }
    });
    console.log(_city, _city[0])
    return _city[0].iataCode;
}