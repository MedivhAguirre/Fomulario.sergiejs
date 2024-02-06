
const firebaseConfig = {
    apiKey: "AIzaSyAVodIn3o82bXX0gIJ4qgOKFz-XWhiKKQ0",
    authDomain: "datos-de-formulario-7dbe6.firebaseapp.com",
    projectId: "datos-de-formulario-7dbe6",
    storageBucket: "datos-de-formulario-7dbe6.appspot.com",
    messagingSenderId: "48466443014",
    appId: "1:48466443014:web:77eb278dc00f1945137c87",
    measurementId: "G-58L1L0CPMN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();







document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    // validar campo nombre/ y borrado de espacios a costados(trim)
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')
    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor ingresar tu nombre'
        //agregar clase y color rojo al error/ error message viene de ccs
        errorNombre.classList.addEventListener('error-message')
        // de caso contrario de ingresar otro caracter
    } else {
        errorNombre.textContent = ''
        //agregar clase y color rojo al error/ error message viene de ccs
        errorNombre.classList.remove('error-message')

    }
    //validar correo electronico 
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPaterns = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //patron basico
    // si coincide va con el patron va a dar true eso agregando los @ / si da negativo ya entrara en la que sigue en las llaves
    if (!emailPaterns.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor ingresar un email valido'
        emailError.classList.addEventListener('error-message')

    } else {
        emailError.textContent = ''
        //agregar clase y color rojo al error/ error message viene de ccs
        emailError.classList.remove('error-message')

    }
    // validad la contraseña 
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    if (contrasenaEntrada.value.length < 8) {
        contrasenaError.textContent = 'Por favor ingresar una contraseña con mas de 8 caracteres'
        contrasenaError.classList.add('error-message')

    } else {
        contrasenaError.textContent = ''
        //agregar clase y color rojo al error/ error message viene de ccs
        contrasenaError.classList.remove('error-message')

    }
    //si todo esta correcto enviar formulario 
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        db.collection("users").add({
            Nombre: entradaNombre.value,
            Email: emailEntrada.value,
            Password: contrasenaEntrada.value,
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });



        alert('el formulario se envio con exito')
        document.getElementById('formulario').reset();
    }




})