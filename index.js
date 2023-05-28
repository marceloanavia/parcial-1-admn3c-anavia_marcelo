const app = new Vue({

    el: '#contenedor',
    data: {
        panelLoginVisible: false,
        login: false,
        nombreCargado: '',
        pianos: [],
        tienda: false,
        precios: false,
        apariencia: false,
        baratos: false,
        nuevos: false,
        todos: true,
        estiloFuente: {color: 'black'},
        tipografia: {fontFamily: "'EB Garamond', serif"},
        fondo: {backgroundColor: 'snow'},
        flex:  {flexDirection: 'row'}
      
    },
    mounted() {
        console.log("Se ha montado el componente");

        const isLogin = JSON.parse(localStorage.getItem('login'));
        this.nombreCargado = JSON.parse(localStorage.getItem('nombreingresado'));

        if(isLogin) { 
            this.login = true;
        }
        
       if(!localStorage.getItem('misPianos')){
            this.pianos.push({id: 1, imagen:"img/nuevo.jpg",titulo: "Yamaha N1X", descripcion: "El piano ideal para el estudio avanzado - Mecánica de piano de cola real, en el espacio de un vertical", precio: 400, enable: true});
            this.pianos.push({id: 2, imagen:"img/barato.jpg",titulo: "Casio N2", descripcion: "Verdaderas características de piano de cola en un piano vertical con un diseño minimalista y austero", precio: 242, enable: true});
            this.pianos.push({id: 3, imagen:"img/profesional.jpg",titulo: "Nord NU1X", descripcion: "La última edición de nuestra galardonada serie Piano está equipada con dos motores de piano, dos sintetizadores de muestra y el doble de memoria que la generación anterior", precio: 5000, enable: true});
            localStorage.setItem('misPianos', JSON.stringify(this.pianos));
        }

       this.pianos = JSON.parse(localStorage.getItem('misPianos'));


       if(!localStorage.getItem('estiloLetra')){
            this.estiloFuente.color = 'black';
            localStorage.setItem('estiloLetra', JSON.stringify(this.estiloFuente.color));
        }
        this.estiloFuente.color = JSON.parse(localStorage.getItem('estiloLetra'));

        if(!localStorage.getItem('estiloTipografia')){
            this.tipografia.fontFamily = "'EB Garamond', serif";
            localStorage.setItem('estiloTipografia', JSON.stringify(this.tipografia.fontFamily));
        }
        this.tipografia.fontFamily = JSON.parse(localStorage.getItem('estiloTipografia'));


        if(!localStorage.getItem('estiloFondo')){
            this.fondo.backgroundColor = 'snow';
            localStorage.setItem('estiloFondo', JSON.stringify(this.fondo.backgroundColor));
        }
        this.fondo.backgroundColor = JSON.parse(localStorage.getItem('estiloFondo'));

        if(!localStorage.getItem('estiloFlex')){
            this.flex.flexDirection = 'row';
            localStorage.setItem('estiloFlex', JSON.stringify(this.flex.flexDirection));
        }
        this.flex.flexDirection = JSON.parse(localStorage.getItem('estiloFlex'));
    },

    methods: {
        agregarPiano(){
            let nuevoPiano = {id: this.pianos.length + 1, imagen: imagen.value, titulo: titulo.value, descripcion: descripcion.value, precio: precio.value, enable: true };
            this.pianos.push(nuevoPiano);
        },
        authenticated(status) {
            if(status) {

                console.log("Se pudo loguear correctamente");

            }
        },
        borrarPiano(id){
            for (let piano of this.pianos){
                if(piano.id == id){
                    piano.enable = false;
                }   
            }
        },
        guardarCambios(){
            localStorage.setItem('misPianos', JSON.stringify(this.pianos));
        },
        recuperarPianos(){
            for (let piano of this.pianos){
                piano.enable = true;

                //guardo el true en el localstorage
                let pianoString = JSON.stringify(piano);
                localStorage.setItem(piano.id, pianoString);
            }
        },
        mostrarPanelLogin() {
            this.panelLoginVisible = true;
        },
        ocultarPanelLogin() {
            this.panelLoginVisible = false;
        },
        iniciarSesion() {
            this.login = true;
            localStorage.setItem('login', 'true');
            this.ocultarPanelLogin();
        },
        cargarNombre(nombre) {
            this.nombreCargado = nombre;
            let nombreString = JSON.stringify(this.nombreCargado)
            localStorage.setItem('nombreingresado', nombreString );
          },
        toogleLogin() {
            if(!this.login) { // Si no está logueado
                this.mostrarPanelLogin();
            } else {
                console.log('Se ha cerrado la sesión');
                localStorage.setItem('login', 'false');
                localStorage.setItem('nombreingresado', 'false' );
                this.login = false;
            }
        },
        envioDeInformacion() {
            console.log('Se ha enviado la información');
        },
        cambiarSec(param){
            this.sec[param];
        },
        togglePrecios() {
            if(this.precios == false){
                this.precios = true;
            } else {
                this.precios = false;
            }
            
        },
        toggleApariencia(){
            if(this.apariencia == false){
                this.apariencia = true;
            } else {
                this.apariencia = false;
            }
        },
        toggleTienda(){
            if(this.tienda == false){
                this.tienda = true;
            } else {
                this.tienda = false;
            }
        },
        toggleTodos(){
            if(this.todos == false){
                this.todos = true;
                this.baratos = false;
                this.nuevos = false;
            } 
        },
        toggleBaratos(){
            if(this.baratos == false){
                this.baratos = true;
                this.todos = false;
                this.nuevos = false;
            } 
        },
        toggleNuevos(){
            if(this.nuevos == false){
                this.nuevos = true;
                this.baratos = false;
                this.todos = false;
            }
        },
        cambiarFuente() {
            if (this.estiloFuente.color == 'black'){
                this.estiloFuente.color = 'white';
                localStorage.setItem('estiloLetra', JSON.stringify(this.estiloFuente.color));
            } else {
                this.estiloFuente.color = 'black';
                localStorage.setItem('estiloLetra', JSON.stringify(this.estiloFuente.color));
            }

        },
        cambiarTipografia() {
            if (this.tipografia.fontFamily === "'EB Garamond', serif") {
              this.tipografia.fontFamily = "'Inter', sans-serif";
              localStorage.setItem('estiloTipografia', JSON.stringify(this.tipografia.fontFamily));
            } else {
              this.tipografia.fontFamily = "'EB Garamond', serif";
              localStorage.setItem('estiloTipografia', JSON.stringify(this.tipografia.fontFamily));
            }
          },
        cambiarFondo() {
            if (this.fondo.backgroundColor == 'snow'){
                this.fondo.backgroundColor = 'lightslategray';
                localStorage.setItem('estiloFondo', JSON.stringify(this.fondo.backgroundColor));
            } else {
                this.fondo.backgroundColor = 'snow';
                localStorage.setItem('estiloFondo', JSON.stringify(this.fondo.backgroundColor));
            }
        },
        cambiarFlex() {
            if (this.flex.flexDirection == 'row'){
                this.flex.flexDirection = 'column';
                localStorage.setItem('estiloFlex', JSON.stringify(this.flex.flexDirection));
            } else {
                this.flex.flexDirection = 'row';
                localStorage.setItem('estiloFlex', JSON.stringify(this.flex.flexDirection));
            }
        }
        
        
        
    },
    computed: {

    }
});
