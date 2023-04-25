<script>
function salvarForm() {
  // Obter os valores dos campos de entrada
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;
  var confirmarSenha = document.getElementById("confirmarSenha").value;
  var cpf = document.getElementById("cpf").value;
  var data = document.getElementById("data").value;

  // Verificar se o e-mail é válido
  if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com")) {
    alert("Por favor, insira um endereço de e-mail válido do Gmail ou Hotmail.");
    return;
  }

  // Verificar se as senhas são iguais e têm pelo menos 8 dígitos
  if (senha !== confirmarSenha || senha.length < 8) {
    alert("As senhas não correspondem ou têm menos de 8 caracteres.");
    return;
  }

  // Verificar se o CPF tem pelo menos 14 dígitos
  if (cpf.length < 14) {
    alert("Por favor, insira um CPF válido com 14 dígitos.");
    return;
  }

  // Verificar se a data está completa no formato dd/mm/aaaa
  var dataPattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!data.match(dataPattern)) {
    alert("Por favor, insira uma data válida no formato dd/mm/aaaa.");
    return;
  }
</script>