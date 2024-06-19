// Função chamada com o resultado de FB.getLoginStatus()
function statusChangeCallback(response) {
  console.log('statusChangeCallback', response); // Log do status de login atual

  if (response.status === 'connected') {
    testarAPI(); // Se conectado, chama a função para buscar informações do usuário
  } else {
    // Se não estiver logado ou não for possível determinar o status
    // document.getElementById('status').innerHTML = 'Please log into this webpage.';
  }
}

// Função chamada quando o usuário finaliza com o botão de Login
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// Função para realizar logout
function logout() {
  FB.logout(function(response) {
    // Limpa o conteúdo do usuário no header
    document.getElementById('user-photo').src = '';
    document.getElementById('user-name').textContent = '';
    document.getElementById('user-info').style.display = 'none';
    document.querySelector('.tooltip').style.display = 'block';
    document.querySelector('.tooltiptext').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'none';
    console.log('User logged out successfully');
  });
}

// Inicialização assíncrona do SDK do Facebook
window.fbAsyncInit = function() {
  FB.init({
    appId: '7461770837282849',
    cookie: true, // Habilita cookies para permitir acesso à sessão pelo servidor
    xfbml: true, // Processa plugins sociais nesta página
    version: 'v3.2' // Utiliza esta versão da Graph API para esta chamada
  });

  // Obtém o status de login assim que o SDK é inicializado
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// Função para buscar informações do usuário após o login bem-sucedido
function testarAPI() {
  console.log('Welcome! Fetching your information....');
  FB.api('/me', { fields: 'name,email,picture.width(150)' }, function(response) {
    console.log('Successful login for: ' + response.name);
    console.log('Email: ' + response.email);
    console.log('Picture URL: ' + response.picture.data.url);

    // Atualiza a imagem e o nome do usuário no header
    document.getElementById('user-photo').src = response.picture.data.url;
    document.getElementById('user-name').textContent = "Olá " + response.name;
    document.getElementById('user-info').style.display = 'flex';

    // Esconde elementos de tooltip e mostra botão de logout
    document.querySelector('.tooltip').style.display = 'none';
    document.querySelector('.tooltiptext').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'block';
  });
}
