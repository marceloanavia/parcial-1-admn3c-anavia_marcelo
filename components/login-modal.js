console.log("Se ha cargado el componente login-modal.js")
const PIN = "4445";


Vue.component('login-modal', {
    template: `
        <div v-show="panelLoginVisible" class="modal" tabindex="-1" role="dialog" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Inicio de sesión</h5>
                        <button type="button" class="cerrar" a @click="ocultarPanelLogin">
                            <span aria-hidden="true">X</span>
                        </button>
                    </div>
                    <form @submit.prevent="loginOnServer">
                        <div class="modal-body">
                            <p>Nombre de Usuario Administrador</p>
                            <input type="text" v-model="nombre" placeholder="Ingrese su nombre de usuario">
                            <hr>
                            <p>PIN</p>
                            <input type="password" v-model="pin">
                            
    
                        </div>
                        <div class="modal-errors">
                            <div v-for="error in errors" class="alert alert-danger" role="alert">
                                {{ error }}
                            </div>                  
                        </div>
                        <div class="modal-footer">
                            <input type="submit" value="Iniciar Sesión" class="button-7 m-1">
                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    props: ['panelLoginVisible', 'ocultarPanelLogin', 'iniciarSesion',],
    computed: {

    },
    methods: {
        loginOnServer: function() {
            this.errors = [];
            if (this.pin !== PIN) {
                this.errors.push("La contraseña es incorrecta");
                return;
            }
            if (!this.nombre) {
                this.errors.push("No hay nombre de usuario ingresado");
                return;
            }
            

            new Promise((success, error) => {
                setTimeout(() => {
                    success();
                }, 2000);
            })
            .then(() => {
                
                console.log("Estamos autenticando al usuario en el servidor");
                this.iniciarSesion();
                this.$emit('authenticated', true);
                this.$emit('nombreingresado', this.nombre);
            })
            .catch(() => {
                console.log("No se pudo autenticar al usuario en el servidor");
                this.$emit('authenticated', false);
            });
        }
    },
    beforeMount() {
        console.log("Se va a montar el componente login-modal");
        console.log(this.panelLoginVisible);
    },
    beforeUpdate() {
        console.log("Se va a actualizar el componente");
        console.log(this.panelLoginVisible);
    },
    data: function() {
        return {
            errors: [],
            pin: "",
            nombre: ""
        }
    }
});