// Exemplo de função em JavaScript
function saudacao(nome) {
    console.log(`Olá, ${nome}!`);
}

// Exemplo de uso de variável e estrutura de repetição
let contador = 0;
while (contador < 3) {
    saudacao("Visitante " + (contador + 1));
    contador++;
}

// Exemplo de uma constante e função de seta (arrow function)
const somar = (a, b) => a + b;
console.log("A soma de 5 e 10 é:", somar(5, 10));