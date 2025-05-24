async function getDatas() {
  const get = await fetch("https://finans.truncgil.com/v4/today.json");
  const data = await get.json();
  console.log(Object.keys(data));

  try {
    const keysToShow = ["USD", "EUR", "TAMALTIN", "CEYREKALTIN", "YARIMALTIN"];
    const html = keysToShow
      .map((key) => {
        const val = data[key];
        return `
        <div class="infoDiv">
        <h3>${val.name || key}</h3>
        <p>Alış: ${val.Buying}</p>
        <p>Satış : ${val.Selling}</p>
        </div>


        `;
      })
      .join("");

    const optionsHTML = keysToShow.map((key) => {
      const val = data[key];
      return `
                <option value="${key}">${val.name || key}</option>    
                     
        `;
    });

    document.getElementById("calculate").innerHTML = `
    <div id="calculateContainer">
    <h2>Hesaplamak istediğiniz miktarı giriniz</h2>
    <input type="text" class="valueInput" placeholder="Please enter a value" id="valueInput">
    <select id="currentSelect" class="currentSelect">${optionsHTML}</select>
    <p id="result"></p>
    <button class="calculate" id="calculate">Calculate</button>   
    </div>
    `;

    document.getElementById("calculate").addEventListener("click", () => {
      const selectedCurrency = document.getElementById("currentSelect").value;
      const valueInput = document.getElementById("valueInput").value;
      const resultCurreny = document.getElementById("result");
      const amount = parseInt(valueInput);

      const calculate = () => {
        const val = data[selectedCurrency];
        const result = val.Buying * amount;
        resultCurreny.innerHTML = "";
        resultCurreny.innerHTML = result;
      };
      calculate();
    });

    document.getElementById("container").innerHTML = html;
  } catch (err) {
    console.log("Veri alınırken bir hata oloştu", err);
  }
}

getDatas();
