document.querySelector('.busca').addEventListener('submit', async (event)=>{
        event.preventDefault();

        let input = document.querySelector('#searchInput').value;

        console.log(input);

        if(input !== ''){
            clearInfo();
            showWaring('Carregando...');

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=6197b97cee254eccf603d4c50bb5c283&units=metric&lang=pt_br`;
            
            let results = await fetch(url);
            let json = await results.json();

            if(json.cod === 200) {
                clearInfo();
              showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

              });
                
            } else {
                clearInfo();
                showWaring('Localização não encontrada');
            }
        } else {
            clearInfo();
        }
});

function showInfo(json) {
    showWaring('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
}
function clearInfo() { 
    showWaring('');
    document.querySelector('.resultado').style.display = 'none';
}
function showWaring(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}