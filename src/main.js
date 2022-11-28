//--------------------------------------------------------------------------------------------
// Exercice GUI2 Vue.js
// CPNV - AMR
//--------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
// Wrapper pour gérer la gestion des événements entre composants

window.Event=new class{
    constructor(){
        this.vue=new Vue();
    }
    fire(event,data = null){
        this.vue.$emit(event, data);
    }
    listen(event, callback){
        this.vue.$on(event, callback);
    }
};
 
//--------------------------------------------------------------------------------------------
// Mixin contenant les fonctions utilisées par plusieurs composants

var myMixin = {
    methods: {
        icone:function(cat){            
            switch(cat) {
                case "moto":
                    icone="fa fa-motorcycle my-darkblue";
                    break;
                case "van":
                    icone="fa fa-bus my-red";
                    break;
                case "velo":
                    icone="fa fa-bicycle my-green";
                    break;
                default:
                    icone="fa fa-car my-orange";
            }           
            return icone;
        }
    }
  }

//--------------------------------------------------------------------------------------------
// Composant listevehicules. Affiche les vehicules dans une liste 'customisée'.

var listeVehicules = Vue.component('liste-vehicules', {
    template: '#listeVehicules',   
    data: function() {
        return {   
            items:[]                          
        }
    },
    mounted: function () {
        this.fetchData();                  
    },     
    methods: {      
        fetchData: function () {
        this.items = vehicules;  
        console.log("items from listevehicules fetchdata()"+ this.items) ;   
        },  
        setVehicule: function (option) {            
            Event.fire('changeVehicule',option);            
        },
        getRightIcon:function (category) {
            return this.$parent.getRightIcon(category)
        }
    }
    });

//--------------------------------------------------------------------------------------------
// Composant detailVehicule. Affiche les détails d'un vehicule avec une animation.

var detailsVehicule = Vue.component('details-vehicule', {
    template: '#detailsVehicule',
    mixins: [myMixin],
    data: function() {
        return {     
            selectedItem:[],
                 
        }
    },
    mounted: function () {
        this.fetchData();   
        Event.listen('changeVehicule',function(n){  
            this.changeValeurs(n);             
        }.bind(this)) ;
    },
    methods: {      
        fetchData: function () {
            this.selectedItem = vehicules[0];                                    
        },     
        changeValeurs:function(n){          
            this.selectedItem = vehicules[n];     
            console.log("selectedItem from detailvehicules changedata()"+ this.selectedItem.titre.toString()) ;          
        },
        getRightIcon(category) {
            return this.$parent.getRightIcon(category)
        }
    }
    });

//--------------------------------------------------------------------------------------------
// Application principale Vue

var app = new Vue({       
    el: '#app',
    methods: {
        getRightIcon(category) {
            switch (category) {
                case 'velo':
                    return 'fa fa-bicycle my-green'
                case 'moto':
                    return 'fa fa-motorcycle my-darkblue'
                case 'voiture':
                    return 'fa fa-car my-orange'
                case 'van':
                    return 'fa fa-bus my-red'
            }
        }  
    }
    });
    
