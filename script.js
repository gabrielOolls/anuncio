
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');

    if (!form) return; // Executa somente na Landing Page

    // 1. Captura a origem do visitante pela URL
    // Exemplo: ?origem=banner_viagens
    const urlParams = new URLSearchParams(window.location.search);
    const origem = urlParams.get('origem') || 'acesso_direto';

    document.getElementById('origemLead').value = origem;

    // 2. Máscara automática para WhatsApp
    const whatsInput = document.getElementById('whatsapp');

    whatsInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }

        if (value.replace(/\D/g, '').length > 10) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`;
        }

        e.target.value = value;
    });

    // 3. Validação e envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();

        let isValid = true;

        // Limpa mensagens de erro anteriores
        document.getElementById('erroNome').textContent = '';
        document.getElementById('erroEmail').textContent = '';
        document.getElementById('erroWhats').textContent = '';

        // Validação do nome
        if (nome.length < 3) {
            document.getElementById('erroNome').textContent =
                'Informe seu nome para receber o guia de viagens.';
            isValid = false;
        }

        // Validação do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            document.getElementById('erroEmail').textContent =
                'Informe um endereço de e-mail válido.';
            isValid = false;
        }

        // Validação do WhatsApp
        const numeroWhats = whatsapp.replace(/\D/g, '');

        if (numeroWhats.length !== 11) {
            document.getElementById('erroWhats').textContent =
                'Informe um WhatsApp válido com DDD.';
            isValid = false;
        }

        // 4. Cadastro do visitante
        if (isValid) {

            const novoLead = {
                nome,
                email,
                whatsapp,
                origem,
                interesse: 'Turismo e Viagens',
                dataCadastro: new Date().toLocaleString('pt-BR')
            };

            // Salva os cadastros no navegador
            const leadsSalvos =
                JSON.parse(localStorage.getItem('leads_capturados')) || [];

            leadsSalvos.push(novoLead);

            localStorage.setItem(
                'leads_capturados',
                JSON.stringify(leadsSalvos)
            );

            console.log('Novo viajante cadastrado:', novoLead);

            // 5. Exibe mensagem de sucesso
            form.classList.add('hidden');

            document.querySelector('.lp-form-box h2')
                .classList.add('hidden');

            document.getElementById('userNameSuccess').textContent =
                nome.split(' ')[0];

            document.getElementById('successBox')
                .classList.remove('hidden');
        }
    });
});
