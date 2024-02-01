
function verificarSapata() {
    // Obter os valores dos campos de texto
    var medidaSapata = parseFloat(document.getElementById("medidaSapata").value);

    // Verificar o estado da sapata
    if (medidaSapata >= 10 && medidaSapata < 18) {
        document.getElementById("resultado").innerHTML = `Urgencia na troca! Medida: ${medidaSapata}mm`;
    } else if (medidaSapata >= 18 && medidaSapata < 33) {
        document.getElementById("resultado").innerHTML = `Bom estado de sapata! Medida: ${medidaSapata}mm`;
    } else {
        document.getElementById("resultado").innerHTML = `Medida fora da faixa aceitavel.`;
    }
                    
}


function inserirDados() {
    let codigoVeiculo = document.getElementById("codigoVeiculo").value;
    let dataPreventiva = document.getElementById("dataPreventiva").value;
    let numeroSapata = document.getElementById("numeroSapata").value;
    var medidaSapata = parseFloat(document.getElementById("medidaSapata").value);

    // Conectar ao banco de dados SQLite
    let sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('database.db');
    

    // Inserir dados na tabela
    db.run(
        'INSERT INTO tabela_sapatas(codigoVeiculo, dataPreventiva, numeroSapata, medidaSapata) VALUES (?, ?, ?, ?)',
        [codigoVeiculo, dataPreventiva, numeroSapata, medidaSapata],
        function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Row inserted with id ${this.lastID}`);
            document.getElementById("resultado").innerHTML = "Dados inseridos com sucesso!";
        }
    );

    // Fechar a conexão com o banco de dados
    db.close();
}

function verificarEInserir() {
    // Chama ambas as funções
    verificarSapata();
    inserirDados();
}

