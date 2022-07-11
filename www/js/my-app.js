// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    { path: '/index/', url: 'index.html', },
    { path: '/about/', url: 'about.html', },
    { path: '/inicio-sesion/', url: 'inicio-sesion.html', },
    { path: '/panel-usuario/', url: 'panel-usuario.html', },
    { path: '/registro-datos/', url: 'registro-datos.html', },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

var db, email;
var colUsuarios;
var rol = "developer";

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");

  db = firebase.firestore();
  colUsuarios = db.collection("usuarios");

  // sembrado();

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  $$('#bRegistro').on('click', fnRegistro);
})

$$(document).on('page:init', '.page[data-name="inicio-sesion"]', function (e) {
  $$('#bIngresa').on('click', fnIngresa);
})

$$(document).on('page:init', '.page[data-name="registro-datos"]', function (e) {
  $$('#bRegistroFin').on('click', fnRegistroFin);
})

function fnRegistroFin() {
  //identificador
  elId = email;
  //recuperar datos del formulario
  nombre = $$('#rNombre2').val();
  apellido = $$('#rApellido2').val();
  pais = $$('#rPais2').val();
  telefono = $$('#rTelefono2').val();
  fnac = $$('#rFNac2').val();

  //construyo el objeto de datos JSON

  var datos = {
    nombre: nombre,
    apellido: apellido,
    pais: pais,
    telefono: telefono,
    fechaNac: fnac,
    rol: rol
  }

  colUsuarios.doc(elId).set(datos)
    .then(function (ok) {
      console.log("Registro en BD OK!");
      mainView.router.navigate('/panel-usuario/');

    })
    .catch(function (e) { console.log("Error en BD" + e) })
}

function fnIngresa() {
  email = $$('#lEmail').val();
  password = $$('#lPassword').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      $$('#lMensaje').html("Bienvenido a mi App !!");

      console.log("Ingreso correcto");

      mainView.router.navigate('/panel-usuario/');
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.error(errorCode + " -- " + errorMessage);

      switch (errorCode) {
        case "auth/wrong-password": mensaje = "La contraseña es incorrecta";
          break;

        case "auth/user-not-found": mensaje = "El correo electrónico no está registrado";
          break;

        default: mensaje = "Intente de nuevo";
      }

      $$('#lMensaje').html("Hubo un error. " + mensaje);
    });
}


function fnRegistro() {
  email = $$('#rEmail').val();
  password = $$('#rPassword').val();

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      $$('#rMensaje').html("Bienvenido a mi App !!");

      console.log("Usuario creado");

      mainView.router.navigate('/registro-datos/');
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.error(errorCode + " -- " + errorMessage);

      switch (errorCode) {
        case "auth/weak-password": mensaje = "La contraseña es muy débil";
          break;

        case "auth/email-already-in-use": mensaje = "El correo electrónico ya está en uso";
          break;

        default: mensaje = "Intente de nuevo";
      }

      $$('#rMensaje').html("Hubo un error. " + mensaje);


      // ..
    });
}

function sembrado() {
  /* console.log("Iniciando el sembrado de datos...");
 
  var data1 = { nombre: "Admin", apellido: "uno", rol: "admin" };
   elId1 = "uno@admin.com";
   clave1 = "admin1";
 
   firebase.auth().createUserWithEmailAndPassword(elId1, clave1)
     .then(function () {
       colUsuarios.doc(elId1).set(data1)
         .then(function (ok) { console.log("Nuevo ok"); })
     })
     .catch(function (e) {
       console.log("Error: " + e)
     });
 
   var data2 = { nombre: "Admin", apellido: "uno", rol: "admin" };
   elId2 = "dos@admin.com";
   clave2 = "admin2";
 
   firebase.auth().createUserWithEmailAndPassword(elId2, clave2)
     .then(function () {
       colUsuarios.doc(elId2).set(data2)
         .then(function (ok) { console.log("Nuevo ok"); })
     })
     .catch(function (e) {
       console.log("Error: " + e)
     });*/




  /* colUsuarios.doc(elId).set(data)
     .then(function (ok) { console.log("Nuevo ok"); })
     .catch(function (e) { console.log("Error: " + e) })*/

  /* db.collection("personas").add(data)
    .then(function(docRef){
      console.log("OK! con el Id " + docRef.id);
    })
    .catch(function (error) {
      console.log("Error: " + error);
    })*/

  console.log("Fin del sembrado de datos...");
}