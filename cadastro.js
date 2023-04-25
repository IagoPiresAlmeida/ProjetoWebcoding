
function salvarForm() {

    const key = "criptografia";
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const encryptedSenha = CryptoJS.AES.encrypt(senha, key).toString();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const data = document.getElementById('data').value;

    const errorContainer = document.getElementById('error-container'); // Elemento que irá conter as mensagens de erro

    // Função para criar e exibir uma mensagem de erro
    const exibirErro = (mensagem, elemento) => {
        // Elemento que irá conter as mensagens de erro
        const erroElemento = document.createElement('div');
        erroElemento.className = 'error-message'; // Classe CSS para estilizar a mensagem de erro
        erroElemento.textContent = mensagem;
        elemento.insertAdjacentElement('afterend', erroElemento); // Insere a mensagem de erro abaixo do elemento correspondente
    };
    const usuarios = Object.keys(localStorage).filter(key => key.startsWith('Usuário')).map(key => localStorage.getItem(key));
    const usuarioExistente = usuarios.find(usuario => {
        const campos = usuario.split(' / ');
        return campos[1] === email || campos[3] === cpf;
    });

    // Função para limpar as mensagens de erro
    const limparErros = () => {
        const erros = document.querySelectorAll('.error-message');
        erros.forEach(erro => erro.remove());
    };

    // No início da função salvarForm(), chame a função limparErros() para remover as mensagens de erro existentes
    limparErros();
    const salvarForm = () => {
        limparErros();
        // Resto do código
    };

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    limparErros();
    const dataHoraCadastro = new Date().toLocaleString();
    if (usuarioExistente) {
        exibirErro("O e-mail ou CPF já está em uso.", document.getElementById('data')); // Exibe uma mensagem de erro se o e-mail ou CPF já existirem
        return; // Retorna para interromper a execução da função
    }
    if (nome.length < 3) {
        exibirErro("O nome deve ter pelo menos 3 caracteres.", document.getElementById('nome'));
    } else if (!nome.match(nomeRegex)) {
        exibirErro("O nome não pode conter números.", document.getElementById('nome'));
    } else if (!email.match(emailRegex)) {
        exibirErro("O email não está no formato padrão.", document.getElementById('email'));
    } else if (senha.length < 6) {
        exibirErro("A senha deve ter pelo menos 6 caracteres.", document.getElementById('senha'));
    } else if (senha !== confirmarSenha) {
        exibirErro("As senhas não correspondem.", document.getElementById('confirmarSenha'));
    } else if (cpf.length < 14) {
        exibirErro("O CPF deve ter 11 caracteres.", document.getElementById('cpf'));
    } else if (data.length < 10) {
        exibirErro("A data deve estar completa no formato dd/mm/aaaa.", document.getElementById('data'));
    } else {
        if (localStorage.cont) {
            localStorage.cont = Number(localStorage.cont) + 1;

        } else {
            localStorage.cont = 1;
        }
        
        
        const dataHoraCadastro = new Date().toLocaleString(); // Obtém a data e hora atual em formato de string
    // Resto do código

    const usuario =  nome + ' / ' + email + ' / ' + encryptedSenha + ' / ' + cpf + ' / ' + data + ' / ' + dataHoraCadastro; // Inclui a data e hora do cadastro no objeto de usuário
    localStorage.setItem("Usuário" + localStorage.cont + " ->", usuario);
    

        const mensagemCadastro = document.getElementById('mensagemCadastro');
        mensagemCadastro.textContent = 'Cadastro realizado com sucesso!';

        setTimeout(function() {
            window.location.href = "login.html"; // Substitua "login.html" pela URL da tela de login
        }, 1000);
    }
}
function formatarCPF(cpfInput) {
    let cpf = cpfInput.value;
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona um ponto após o terceiro dígito
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona outro ponto após o sexto dígito
    cpf = cpf.replace(/(\d{3})(\d{2})$/, '$1-$2'); // Adiciona um traço após o nono dígito
    cpfInput.value = cpf;
  }
  
  function formatarDATA(dataInput) {
    let data = dataInput.value;
    data = data.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  
    data = data.replace(/^(\d{2})(\d)/, function (match, p1, p2) {
      // Adiciona outra barra após o segundo dígito, limita o primeiro valor a 31
      p1 = (p1 > 31 ? '31' : p1);
      return p1 + '/' + (p2 ? + p2 : '' + '/');
    });
  
    data = data.replace(/^(\d{2})\/(\d{2})(\d)/, function (match, p1, p2, p3) {
      // Adiciona outra barra após o quarto dígito, limita o segundo valor a 12
      p1 = (p1 > 31 ? '31' : p1);
      p2 = (p2 > 12 ? '12' : p2);
      return p1 + '/' + p2 + (p3 ? '/' + p3 : '');
    });
  
    data = data.replace(/^(\d{2})\/(\d{2})\/(\d{4}).*/, function (match, p1, p2, p3) {
      // Limita o terceiro valor até 2023
      p1 = (p1 > 31 ? '31' : p1);
      p2 = (p2 > 12 ? '12' : p2);
      p3 = (p3 > 2023 ? '2023' : p3);
      return p1 + '/' + p2 + '/' + p3;
    });
  
    dataInput.value = data;
  }
  