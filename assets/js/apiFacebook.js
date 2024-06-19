  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
    //   document.getElementById('status').innerHTML = 'Please log ' +
    //     'into this webpage.';
    }
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '7461770837282849',
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : 'v3.2'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
      statusChangeCallback(response);        // Returns the login status.
    });
  };
   function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', { fields: 'name,email,picture.width(150)' }, function(response) {
          console.log('Successful login for: ' + response.name);
          console.log('Email: ' + response.email);
          console.log('Picture URL: ' + response.picture.data.url);
  
          // Atualiza a imagem e o nome do usuário no header
          document.getElementById('user-photo').src = response.picture.data.url;
          document.getElementById('user-name').textContent = response.name;
          document.getElementById('user-info').style.display = 'block';
  
          document.querySelector('.tooltip').style.display = 'none';
          document.querySelector('.tooltiptext').style.display = 'none';
       
          // Oculta o botão de login após o login bem-sucedido
          document.getElementById('user-info')..innerHTML = '<p>Oi, ' + response.name + '!</p>';
      });
   
  }
