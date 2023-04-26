const usuarios = Object.values(localStorage).filter(item => item.includes('/'));
function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const key = "criptografia";
    const encryptedSenha = CryptoJS.AES.encrypt(senha, key).toString();
    const errorContainer = document.getElementById('error-container');

    const exibirErro = (mensagem, elemento) => {
        const erroElemento = document.createElement('div');
        erroElemento.className = 'error-message';
        erroElemento.textContent = mensagem;
        elemento.insertAdjacentElement('afterend', erroElemento);
    };

    const limparErros = () => {
        const erros = document.querySelectorAll('.error-message');
        erros.forEach(erro => erro.remove());
    };
const usuarioEncontrado = usuarios.find(usuario => {
        const dadosUsuario = usuario.split(' / ');
        const emailUsuario = dadosUsuario[1];
        const senhaUsuario = dadosUsuario[2];
        const decryptedSenha = CryptoJS.AES.decrypt(senhaUsuario, key).toString(CryptoJS.enc.Utf8);
        return emailUsuario === email && decryptedSenha === senha;
    });

    limparErros();

    if (email === '') {
        exibirErro("O campo de email é obrigatório.", document.getElementById('email'));
    } else if (senha === '') {
        exibirErro("O campo de senha é obrigatório.", document.getElementById('senha'));
    } else if (!usuarioEncontrado) {
        exibirErro("Email ou senha incorretos.", document.getElementById('senha'));
    } else {
        // Exibe mensagem de sucesso
    const mensagemLogin = document.getElementById('mensagemLogin');
    mensagemLogin.textContent = 'Login realizado com sucesso!';
        // Redireciona para a página após o login
        setTimeout(function () {
            window.location.href = "home.html"; // Substitua "home.html" pela URL da página após o login
        }, 1000);
    }
}

const exibirErro = (mensagem) => {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = mensagem;
    
    
};

let btn_email = document.getElementById('email')
let btn_senha = document.getElementById('senha')

btn_email.addEventListener('keypress', (event) => {
    if (event.key == "Enter"){
        login();
    }
})
btn_senha.addEventListener('keypress', (event) => {
    if (event.key == "Enter"){
        login();
    }
})