//Elements references
var inputEth = document.getElementById('input_eth');
var textUsd24h = document.getElementById('text_usd_24h');
var textEurPrice = document.getElementById('text_eur_price');
var textUsdPrice = document.getElementById('text_usd_price');

document.addEventListener('DOMContentLoaded', () => {
    
    //Consts
    const eurValue = null;
    const usdValue = null;
    const eur24hChange = null;
    const usd24hChange = null;

    inputEth.value = 1;
    getEthValueIn('EUR');
    getEthValueIn('USD');

    inputEth.addEventListener('input', (e) => {  
        calculUsdAndEurFromEth(e.target.value);
      });
});

async function getEthValueIn(_fiat){
    try {
          const urlToFetch = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies='+_fiat+"&include_24hr_change=true";
          const response = await fetch(urlToFetch,
              {
                  method: "GET",
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
              });
          const responseData = await response.json();

          if (_fiat == 'EUR'){
          eurValue = responseData.ethereum.eur;
          eur24hChange = responseData.ethereum.eur_24h_change;
          }
          if (_fiat == 'USD'){
          usdValue = responseData.ethereum.usd;
          usd24hChange = responseData.ethereum.usd_24h_change;
          }
          formatTextValues(eurValue, usdValue, eur24hChange, usd24hChange);

      } catch (error) {
          return console.warn(error);
      }
  }

  function calculUsdAndEurFromEth(eth_value) {

    //Arrondir ces résultats à 2 chiffres après la virgule
    const eurRes = eurValue * eth_value;
    const usdRes = usdValue * eth_value;

    formatTextValues(eurRes, usdRes, eur24hChange, usd24hChange);
}

function formatTextValues(eur, usd, eur24h, usd24h) {
    
    //Display ETH Values
    textEurPrice.innerHTML = "🇫🇷 "  + Math.round(eur) + "€";
    textUsdPrice.innerHTML = "🇺🇸 " + Math.round(usd) + "$";

    //Pos 24h
    if (Math.sign(usd24h) == 1){
        textUsd24h.style.color = 'green';
    } else {
        textUsd24h.style.color = 'red';
    }
    textUsd24h.innerHTML = showSign(usd24h) + roundValuesTwoDecimal(usd24h) + "%";
}

function roundValuesTwoDecimal(number) {
    return Math.round((number) * 100) / 100;
}

function showSign(number) {
    if (Math.sign(number) == 1) {
        return "+";
    } else {
        return "";
    }
}