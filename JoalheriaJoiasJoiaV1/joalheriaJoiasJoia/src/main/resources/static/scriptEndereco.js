document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário

        const endereco = {
            cep: document.getElementById('cep').value,
            estado: document.getElementById('estado').value,
            cidade: document.getElementById('cidade').value,
            numero: document.getElementById('numero').value,
            rua: document.getElementById('rua').value,
            complemento: document.getElementById('complemento').value,
            bairro: document.getElementById('bairro').value
        };

        // Validações básicas
        if (!validarCEP(endereco.cep)) {
            alert('Por favor, insira um CEP válido.');
            return;
        }

        if (endereco.estado.length !== 2) {
            alert('Por favor, insira um estado válido.');
            return;
        }

        // Aqui você pode fazer outras validações

        // Exemplo de envio dos dados via AJAX
        fetch('/submit_endereco', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(endereco)
        })
        .then(response => {
            if (response.ok) {
                alert('Endereço cadastrado com sucesso!');
                form.reset();
            } else {
                alert('Erro ao cadastrar endereço.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar endereço.');
        });
    });

    function validarCEP(cep) {
        return /^[0-9]{8}$/.test(cep);
    }
});