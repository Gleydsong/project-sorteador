document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const form = document.getElementById('sortForm');
    const numberInput = document.getElementById('number');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const toggleInput = document.getElementById('toggle');
    const errorMessage = document.getElementById('errorMessage');
    const resultContainer = document.getElementById('resultContainer');
    const numbersContainer = document.getElementById('numbersContainer');
    const resetButton = document.getElementById('resetButton');

    // Função para validar os campos
    function validateFields() {
        // Limpa mensagem de erro anterior
        errorMessage.textContent = '';
        
        // Verifica se os campos estão preenchidos
        if (!numberInput.value || !fromInput.value || !toInput.value) {
            errorMessage.textContent = 'Todos os campos devem ser preenchidos.';
            return false;
        }
        
        // Converte valores para números
        const quantity = parseInt(numberInput.value);
        const min = parseInt(fromInput.value);
        const max = parseInt(toInput.value);
        const noRepeat = toggleInput.checked;
        
        // Verifica se o valor máximo é maior que o valor mínimo
        if (max <= min) {
            errorMessage.textContent = 'O valor máximo deve ser maior que o valor mínimo.';
            return false;
        }
        
        // Verifica se a quantidade é válida
        if (quantity <= 0) {
            errorMessage.textContent = 'A quantidade de números deve ser maior que zero.';
            return false;
        }
        
        // Verifica se a quantidade não é maior que o intervalo disponível quando a opção de não repetir está marcada
        if (noRepeat && quantity > (max - min + 1)) {
            errorMessage.textContent = 'A quantidade de números não pode ser maior que o intervalo disponível quando a opção de não repetir está marcada.';
            return false;
        }
        
        return true;
    }
    
    // Função para sortear números
    function drawNumbers() {
        const quantity = parseInt(numberInput.value);
        const min = parseInt(fromInput.value);
        const max = parseInt(toInput.value);
        const noRepeat = toggleInput.checked;
        
        let drawnNumbers = [];
        
        if (noRepeat) {
            // Cria um array com todos os números do intervalo
            const availableNumbers = [];
            for (let i = min; i <= max; i++) {
                availableNumbers.push(i);
            }
            
            // Embaralha o array e pega os primeiros 'quantity' elementos
            for (let i = 0; i < quantity; i++) {
                const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                drawnNumbers.push(availableNumbers.splice(randomIndex, 1)[0]);
            }
        } else {
            // Sorteia números aleatórios (pode repetir)
            for (let i = 0; i < quantity; i++) {
                const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                drawnNumbers.push(randomNumber);
            }
        }
        
        return drawnNumbers;
    }
    
    // Função para exibir os números sorteados com animação
    function displayNumbers(numbers) {
        // Limpa o container de números
        numbersContainer.innerHTML = '';
        
        // Cria elementos para cada número sorteado
        numbers.forEach((number, index) => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
            numberElement.textContent = number;
            numbersContainer.appendChild(numberElement);
            
            // Adiciona a classe 'show' com um atraso para criar a animação
            setTimeout(() => {
                numberElement.classList.add('show');
            }, 100 * index);
        });
        
        // Exibe o container de resultados
        resultContainer.style.display = 'flex';
    }
    
    // Event listener para o formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Valida os campos
        if (validateFields()) {
            // Sorteia os números
            const drawnNumbers = drawNumbers();
            
            // Exibe os números sorteados
            displayNumbers(drawnNumbers);
        }
    });
    
    // Event listener para o botão de reset
    resetButton.addEventListener('click', () => {
        // Valida os campos
        if (validateFields()) {
            // Sorteia novos números
            const drawnNumbers = drawNumbers();
            
            // Exibe os números sorteados
            displayNumbers(drawnNumbers);
        }
    });
});