const dropList = document.querySelectorAll(".drop-list select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
getButton = document.querySelector("form button");




for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_list) {

        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "INR" ? "selected" : "";
        }

      let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
      dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    
}

window.addEventListener("load", () => {
    getExchangeRate();
});


getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});


const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
   let tempcode = fromCurrency.value;
   fromCurrency.value = toCurrency.value;
   toCurrency.value = tempcode;
   getExchangeRate();
});


function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    exchangeRateText = document.querySelector(".exchange-rate");
    let amountVal = amount.value;

    if(amountVal == "" || amountVal == "0"){
     amount.value = "1";
     amountVal = 1;
    }

    exchangeRateText.innerText = "Getting Exchange Rate..."

    let url = `https://v6.exchangerate-api.com/v6/320ebbd1bb1d072f782bf8fe/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateText.innerText = "Something Went Wrong";
    })
}