//"use strict";
function calculate() {
    
   
    var amount = document.getElementById("amount");                     // Pesquisa os elementos de entrada e saída no documento
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");
    // Obtém a entrada do usuário através dos elementos de entrada. Presume que tudo isso
    // é válido.
    // Converte os juros de porcentagem para decimais e converte de taxa
    // anual para taxa mensal. Converte o período de pagamento em anos
    // para o número de pagamentos mensais.
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;
    // Agora calcula o valor do pagamento mensal.
    var x = Math.pow(1 + interest, payments); // Math.pow() calcula potências
    var monthly = (principal*x*interest)/(x-1);
    // Se o resultado é um número finito, a entrada do usuário estava correta e
    // temos resultados significativos para exibir
    if (isFinite(monthly)) {
    // Preenche os campos de saída, arredondando para 2 casas decimais
    payment.innerHTML = monthly.toFixed(2);
    total.innerHTML = (monthly * payments).toFixed(2);
    totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);
    // Salva a entrada do usuário para que possamos recuperá-la na próxima vez que
    // ele visitar
    save(amount.value, apr.value, years.value, zipcode.value);
   
    // Anúncio: localiza e exibe financeiras locais, mas ignora erros de rede
    try { // Captura quaisquer erros que ocorram dentro destas chaves
    getLenders(amount.value, apr.value, years.value, zipcode.value);
    }
    catch(e) { /* E ignora esses erros */ }
    // Por fim, traça o gráfico do saldo devedor, dos juros e dos pagamentos do
    capital
    chart(principal, interest, monthly, payments);
    }
    else {
    // O resultado foi Not-a-Number ou infinito, o que significa que a entrada
    // estava incompleta ou era inválida. Apaga qualquer saída exibida anteriormente.
    payment.innerHTML = ""; // Apaga o conteúdo desses elementos
    total.innerHTML = ""
    totalinterest.innerHTML = "";
    chart(); // Sem argumentos, apaga o gráfico
    }
}
function save(amount, apr, years, zipcode) {
        if (window.localStorage) { // Só faz isso se o navegador suportar
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
        }
        }
        window.onload = function() {
            // Se o navegador suporta localStorage e temos alguns dados armazenados
            if (window.localStorage && localStorage.loan_amount) {
            document.getElementById("amount").value = localStorage.loan_amount;
            document.getElementById("apr").value = localStorage.loan_apr;
            document.getElementById("years").value = localStorage.loan_years;
            document.getElementById("zipcode").value = localStorage.loan_zipcode;
            }
            };
            function getLenders(amount, apr, years, zipcode) {
                // Se o navegador não suporta o objeto XMLHttpRequest, não faz nada
                if (!window.XMLHttpRequest) return;
                // Localiza o elemento para exibir a lista de financeiras
    var ad = document.getElementById("lenders");
    if (!ad) return; // Encerra se não há ponto de saída
    // Codifica a entrada do usuário como parâmetros de consulta em um URL
    var url = "getLenders.php" + // Url do serviço mais
    "?amt=" + encodeURIComponent(amount) + // dados do usuário na string
    // de consulta
    "&apr=" + encodeURIComponent(apr) +
    "&yrs=" + encodeURIComponent(years) +
    "&zip=" + encodeURIComponent(zipcode);
    // Busca o conteúdo desse URL usando o objeto XMLHttpRequest
    var req = new XMLHttpRequest(); // Inicia um novo pedido
    req.open("GET", url); // Um pedido GET da HTTP para o url
    req.send(null); // Envia o pedido sem corpo
    // Antes de retornar, registra uma função de rotina de tratamento de evento que será
    // chamada em um momento posterior, quando a resposta do servidor de HTTP chegar.
    // Esse tipo de programação assíncrona é muito comum em JavaScript do lado do
    // cliente.
    req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
    // Se chegamos até aqui, obtivemos uma resposta HTTP válida e completa
    var response = req.responseText; // Resposta HTTP como string
    var lenders = JSON.parse(response); // Analisa em um array JS
    // Converte o array de objetos lender em uma string HTML
    var list = "";
    for(var i = 0; i < lenders.length; i++) {
    list += "<li><a href='" + lenders[i].url + "'>" +
    lenders[i].name + "</a>";
    }
    // Exibe o código HTML no elemento acima.
    ad.innerHTML = "<ul>" + list + "</ul>";
    }
    }
}
