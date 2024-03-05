import axios from "axios";
import { pogdata } from "../functions/pogFunctions";

function fetchDailyQuote() {
    return axios.get(`https://zenquotes.io/api/today`)
      .then(response => {
        let quote = response.data
        let quote_string = quote[0].q  + ' -' + quote[0].a;
        print(quote_string)
        pogdata.QUOTE = quote_string
        pogdata.save()
      })
      .catch(error => {
        console.error(error.toString());
      });
  };
  
  module.exports = { fetchDailyQuote };