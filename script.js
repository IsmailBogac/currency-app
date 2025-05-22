async function getDatas() {
 const get = await fetch("https://finans.truncgil.com/v4/today.json") 
 const data = await get.json();
 console.log(Object.keys(data));
  
try{
    const keysToShow = ["USD","EUR"];
    const html = keysToShow.map(key => {
        const val = data[key];
        return `
        <h3>${val.name || key}</h3>
        <p>Alış: ${val.Buying}</p>
        <p>Satış : ${val.Selling}</p>
        `
    }).join("");
    document.getElementById('container').innerHTML= html;
   
    }catch(err){
        console.log('Veri alınırken bir hata oloştu',err);
        
    }
}

getDatas();