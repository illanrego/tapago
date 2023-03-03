
const data = document.querySelector('#selectData');
const mes = document.querySelector('#selectMes');

const load = document.querySelector('#loadBtn');
const save = document.querySelector('#saveBtn');
const clear = document.querySelector('#clearBtn');


const naoPago = document.querySelector('#nPagoBtn');
const pago = document.querySelector('#pagoBtn');
const corrigir = document.querySelector('#correctBtn');
const descanso = document.querySelector('#descansoBtn');

//const tabela = document.querySelector('calendar').innerHTML;

const alpha = document.querySelector('#alphaBtn');
const beta = document.querySelector('#betaBtn');
const gamma = document.querySelector('#gammaBtn');

const treinoOcultar = document.querySelector('#treinoOcultarBtn');
const treinoMostrar = document.querySelector('#treinoMostrarBtn');
const novoNome = document.querySelector('#novoNomeBtn');

const secao = document.querySelector('#secao')


novoNome.addEventListener('click', () => {
    const myName = prompt("Insira um novo nome");
    localStorage.setItem('name', myName);
    setUserName();
});


window.onload = setUserName();

treinoOcultar.addEventListener('click', () => {
 
   document.getElementById("treino").style.display = "none";
 
});

treinoMostrar.addEventListener('click', ocultarTreino);

function ocultarTreino() {
 
   document.getElementById("treino").style.display = "initial";
 
};



function setUserName() {
if (localStorage.getItem("name") === 'null' || localStorage.getItem("name") === undefined) {
    const myName = prompt("Insira seu nome");
    localStorage.setItem("name", myName);
    const myHeading = document.querySelector('h1');
    myHeading.textContent = `TÁ PAGO, ${myName}?`;
  } else {
    const myName = localStorage.getItem("name");
    const myHeading = document.querySelector('h1');
    myHeading.textContent = `TÁ PAGO, ${myName}?`;

 }
};



alpha.addEventListener('click', () => {
   setTreinoDoDia('alpha')  
});

beta.addEventListener('click', () => {
    setTreinoDoDia('beta')  
 });

gamma.addEventListener('click', () => {
    setTreinoDoDia('gamma')  
 });


function setTreinoDoDia(treino) {
    const day = data.value;
    const cells = document.getElementsByTagName("td");
    const chosenDay = cells[day-1];
   if (treino === 'alpha') {
        chosenDay.textContent += ' α'; 
        } else if (treino === 'beta') {
        chosenDay.textContent += ' β';
       } else if (treino === 'gamma') {
        chosenDay.textContent += ' γ';
   }
    
};
  

const headRow = document.createElement("tr");


generateHeader("Segunda");
generateHeader("Terça");
generateHeader("Quarta");
generateHeader("Quinta");
generateHeader("Sexta");
generateHeader("Sabado");
generateHeader("Domingo");


data.addEventListener('change', () => {

    const diaEscolhido = new Date(2023, `${mes.value -1}`, `${data.value}`);
    const tituloVelho = document.querySelector('h2');
    const tituloNovo = document.createElement('h2');
   // tituloNovo.textContent = diaEscolhido.toDateString();
    const options = { weekday: "long", month: "long", day: "numeric" };
    const diaDescrito = new Intl.DateTimeFormat ("pt-BR", options).format(diaEscolhido);
    tituloNovo.textContent = diaDescrito;
    document.body.insertBefore(tituloNovo, calendar);
    if (tituloVelho) tituloVelho.remove();

});


  
mes.addEventListener('change', () => {
    
    mudarTitulo();
    loadF(); 
});
  

save.addEventListener('click', saveF);


function saveF() {
    const month = mes.value;
    if (typeof month !== '') { 
    
      let tabelaAgora = document.getElementById('calendar').innerHTML;
      localStorage.setItem(`tabela${month}`,  tabelaAgora);
      alert("tabela salva!?");
    
    } else {
    
      alert("escolha um mês!");
    }
};




function loadF() {
    const month = mes.value;
    if (localStorage.getItem(`tabela${month}`) !== null) {
    
      const loadedContent = localStorage.getItem(`tabela${month}`);
      const tabelaNova = document.createElement('div');
      tabelaNova.innerHTML = loadedContent;
      const tabelavelha = document.getElementById('calendar');
      if (tabelavelha) tabelavelha.remove();
      tabelaNova.id = 'calendar';
      document.body.appendChild(tabelaNova);

   } else { 
   
      const tabelavelha = document.getElementById('calendar');
      if (tabelavelha) tabelavelha.remove();
    
    generateCalendar(2023, month);

   }
   data.value = '';
};

function setCondicaoDia(condicao) {
    const day = data.value;
    const cells = document.getElementsByTagName("td");
    const chosenDay = cells[day-1];
    const stringDay = day.toString();


   if (condicao === 'pago') 
   chosenDay.className = 'pago';
   if (condicao === 'naopago')
   chosenDay.className = 'naopago';
   if (condicao === 'corrigir') {
   chosenDay.className = 'corrigir'
   chosenDay.textContent = `${stringDay}`; }
   if (condicao === 'descanso')
   chosenDay.className = 'descanso'

};


naoPago.addEventListener('click', () =>
setCondicaoDia("naopago"));

pago.addEventListener('click', () =>
setCondicaoDia("pago"));

corrigir.addEventListener('click', () =>
setCondicaoDia("corrigir"));

descanso.addEventListener('click', () =>
setCondicaoDia("descanso"));

window.onload = data.value = "";
window.onload = mes.value = "";

function mudarTitulo() {
     const diaEscolhido = new Date(2023, `${mes.value -1}`);
     const tituloVelho = document.querySelector('h2');
     const tituloNovo = document.createElement('h2');
   
     const options = { month: "long" };
     const diaDescrito = new Intl.DateTimeFormat ("pt-BR", options).format(diaEscolhido);
     tituloNovo.textContent = diaDescrito;
     document.body.appendChild(tituloNovo);
     if (tituloVelho) tituloVelho.remove();
    
}
      
      
      
      
      
function generateCalendar(year, month) {
    const wrapper = document.createElement("div");
    const tbl = document.createElement("table");
    const tblhead = document.createElement("thead");
    const tblBody = document.createElement("tbody");
    
    tblhead.appendChild(headRow);
    tbl.appendChild(tblhead);
    tbl.appendChild(tblBody);
     
    document.body.appendChild(wrapper);
    wrapper.appendChild(tbl); 
      
    let mon = month - 1;
    let d = new Date(year, mon);
      
    const row = document.createElement("tr");
    tblBody.appendChild(row);
      
    
    for (let i = 0; i < getDay(d); i++) {
     
    const cell = document.createElement("th");
    const cellText = document.createTextNode('');
     cell.appendChild(cellText);
     tblBody.appendChild(cell);
      }
      
      
      while (d.getMonth() == mon) {
        const cell = document.createElement("td");
        dayName = d.getDate()
        const cellText = document.createTextNode(dayName)
        cell.appendChild(cellText);
        tblBody.appendChild(cell);
        
          if (getDay(d) % 7 == 6) {
            const row2 = document.createElement("tr");
            tblBody.appendChild(row2);  
          }
          
          d.setDate(d.getDate() +1);
      
      };
      
      if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
          const cell2 = document.createElement("th");
          const cellText2 = document.createTextNode('');
          cell2.appendChild(cellText2);
          tblBody.appendChild(cell2);
        }
        
       }
       
     wrapper.id = 'calendar';
       
};
     
function getDay(date) {
       let day = date.getDay();
       if (day == 0) day = 7;
       return day - 1;
       
};  
     
 
     
function generateHeader(name) {        
      
      const head = document.createElement("th");
      const text = document.createTextNode(name);
      head.appendChild(text);
      headRow.appendChild(head);
};
    