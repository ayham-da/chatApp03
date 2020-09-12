
const ausgabe = document.querySelector('.ausgabe');
const eingabe = document.querySelector('.eingabe');
const name_eingabe  = document.querySelector('.name_eingabe');
const senden  = document.querySelector('.senden');

const fetchJSON = async (query,body)=> {
  let response = await fetch(
    'http://localhost:9922' + query, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  });
  return await response.json();
};

const nachrichtenAbholen = async ()=> {
  let data = await fetchJSON('/message',{});
  datenAusgeben(data.msgs);
};

const datenAusgeben = (msgs)=> {
  ausgabe.innerHTML = '';
  for ( message of msgs ){
    ausgabe.innerHTML += '<li' + +'>' + message + '</li>' ;
  }
};

senden.onclick = async e => {
  let message = eingabe.value;
  let user = name_eingabe.value;
  let data = await fetchJSON(
    '/message', { msg:message, name:user }
  );
  datenAusgeben(data.msgs);
  eingabe.value = '';
};

setInterval(nachrichtenAbholen,1000);
nachrichtenAbholen();
