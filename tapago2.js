const data = document.querySelector('#selectData');
const mes = document.querySelector('#selectMes');

const pago = document.querySelector('#pagoBtn');
const naoPago = document.querySelector('#naopagoBtn');
const descanso = document.querySelector('#descansoBtn');
const corrigir = document.querySelector('#corrigirBtn');
const salvar = document.querySelector('#salvarBtn')

window.onload = data.value = '';
window.onload = mes.value = '';

/* AO SELECIONAR O MÊS É GERADO O TÍTULO E CALENDÁRIO ADEQUADO*/

mes.addEventListener('change', () => {
    mudarTituloMes();
    loadMes();
})

function mudarTituloMes() {
    const diaEscolhido = new Date(2023, `${mes.value -1}`);
    const tituloVelho = document.querySelector('h2');
    const tituloNovo = document.createElement('h2');

    const options = {month: "long"};
    const diaPorExtenso = new Intl.DateTimeFormat ("pt-BR", options).format(diaEscolhido);
    tituloNovo.textContent = diaPorExtenso;
    document.body.appendChild(tituloNovo);
    if (tituloVelho) tituloVelho.remove();
}

function loadMes() {
    const month = mes.value;
    if (localStorage.getItem(`tabela${month}`) !== null) {
        const loadedTable = localStorage.getItem(`tabela${month}`);
        const tabelaNova = document.createElement('div');
        const tabelaVelha = document.getElementById('calendario')
        tabelaNova.innerHTML = loadedTable;
        if (tabelaVelha) tabelaVelha.remove();
        tabelaNova.id = 'calendario';
        document.body.appendChild(tabelaNova);
    } else {
        const tabelaVelha = document.getElementById('calendario');
        if (tabelaVelha) tabelaVelha.remove();
        gerarCalendario(2023, month);
    }
    data.value = '';
};

function gerarCalendario(year, month) {
    const wrapper = document.createElement('div');
    const table = document.createElement('table');
    const tblHead = document.createElement('thead');
    const tblBody = document.createElement('tbody');

    /* CRIAR CABEÇALHO FIXO COM DIAS DA SEMANA */
    const diasRow = document.createElement("tr");
    const Semana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo' ];
    for (const cadaDia of Semana) {
        const head = document.createElement('th');
        const text = document.createTextNode(cadaDia);
        head.appendChild(text);
        diasRow.appendChild(head);
    }
    
    /* ESTRUTURAR A TABELA */
    tblHead.appendChild(diasRow);
    table.appendChild(tblHead);
    table.appendChild(tblBody);
    document.body.appendChild(wrapper);
    wrapper.appendChild(table);

    let mesNumero = month -1;
    let mesEscolhido = new Date(year, mesNumero)

    const novaLinha = document.createElement('tr');
    tblBody.appendChild(novaLinha);

    /*PREENCHER CELULA VAZIAS ANTES DO PRIMEIRO DIA*/
    for (let illao = 0; illao < getDiadaSemana(mesEscolhido); illao++) {
        const celula = document.createElement('th');
        const celulaText = document.createTextNode('');
        celula.appendChild(celulaText);
        tblBody.appendChild(celula);
    };

    /*PEGAR CADA DATA DO MÊS E GERAR CÉLULA ATÉ O MÊS VIRAR*/
    while (mesEscolhido.getMonth() == mesNumero) {
        const celula = document.createElement('td');
        numeroDia = mesEscolhido.getDate();
        const celulaTexto = document.createTextNode(numeroDia);
        celula.appendChild(celulaTexto);
        tblBody.appendChild(celula);

            /*FINAL DA SEMANA INSERE NOVA LINHA*/
            if (getDiadaSemana(mesEscolhido) % 7 == 6) {
                const linha2 = document.createElement('tr');
                tblBody.appendChild(linha2);
            };

        mesEscolhido.setDate(mesEscolhido.getDate() +1);
    };

    /*PREENCHER OS ESPAÇOS VAZIOS ATÉ ACABAR A ULTIMA SEMANA*/
    if (getDiadaSemana(mesEscolhido) != 0) {
        for (let illao = getDiadaSemana(mesEscolhido); illao < 7; illao++) {
            const celula2 = document.createElement('th');
            const celulaTexto2 = document.createTextNode('');
            celula2.appendChild(celulaTexto2);
            tblBody.appendChild(celula2);
        };

    };

wrapper.id = "calendario";

};

function getDiadaSemana(data) {
    let dia = data.getDay();
    if (dia == 0) dia = 7;
    return dia - 1;
};

/*AO SELECIONAR O DIA, O TÍTULO MUDA PARA O DIA ESPECÍFICO */
data.addEventListener('change', () => {
    const diaEscolhido = new Date(2023, `${mes.value -1}`, `${data.value}`);
    const tituloVelho = document.querySelector('h2');
    const tituloNovo = document.createElement('h2');
    const options = {weekday: "long", month: "long", day: "numeric"};
    const diaPorExtenso = new Intl.DateTimeFormat ("pt-BR", options).format(diaEscolhido);
    tituloNovo.textContent = diaPorExtenso;
    document.body.insertBefore(tituloNovo, calendario);
    if (tituloVelho) tituloVelho.remove();

    focusData();
});

function focusData() {
    const focadoVelho = document.querySelector('.focado');
    if (focadoVelho) focadoVelho.classList.remove('focado');

    const dia = data.value;
    const celulas = document.getElementsByTagName('td');
    const diaEscolhido = celulas[dia -1];
    diaEscolhido.classList.add('focado');

}

/* APÓS SELECIONAR O DIA É POSSÍVEL ESCOLHER SEU STATUS */
function setCondicaoDia(condicao) {
    const dia = data.value;
    const celulas = document.getElementsByTagName('td');
    const diaEscolhido = celulas[dia -1];
    const stringDia = dia.toString();

    if (diaEscolhido === undefined) {
        alert("Escolha um dia!")
    } else {

      if (condicao === 'pago')
      diaEscolhido.className = 'pago';
      if (condicao === 'naopago')
      diaEscolhido.className = 'naopago';
      if (condicao === 'corrigir') {
          diaEscolhido.className = 'corrigir';
          if (dia <= 9)
          diaEscolhido.textContent = `${stringDia[1]}`;
          else { diaEscolhido.textContent = `${stringDia}`;}}
      if (condicao === 'descanso')
      diaEscolhido.className = 'descanso';
    }

};

naoPago.addEventListener('click', () =>
setCondicaoDia("naopago"));

pago.addEventListener('click', () =>
setCondicaoDia("pago"));

corrigir.addEventListener('click', () =>
setCondicaoDia("corrigir"));

descanso.addEventListener('click', () =>
setCondicaoDia("descanso"));

salvar.addEventListener('click', () => {
    const mesEscolhido = mes.value;
    if (typeof mesEscolhido !== '') {
        let tabelaAgora = document.getElementById('calendario').innerHTML;
        localStorage.setItem(`tabela${mesEscolhido}`, tabelaAgora);
        alert("tabela salva!");
    } else {
        alert("escolha um mês!");
    }
});
