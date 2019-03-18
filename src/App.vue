<template>
  <div id="app">
    
    <router-view/>

    <div :class="'row toolbar  no-gutters ' + toolbar_class">
		

		<div class="col-sm-6" v-if="toolbar_visible">
			<div class="toolbar-log" >
				<span class="badge badge-primary">{{ config.id }}</span> 
				<span class="badge badge-secondary">{{ current_page }}</span>
				<span :class="is_connected?'badge badge-success':'badge badge-danger'">{{ is_connected?'Connected':'Disconnected' }}</span>
			</div>
			<div class="toolbar-log"><pre class="d-inline" v-html="toolbar_command"></pre></div>

			
		</div>
		<div class="col-sm-6 text-right">
			<span v-if="toolbar_visible">
				
				<a class="toolbar-btn" href="#" @click="toggleConfig()"><i class="fa fa-cog"></i></a>
			</span>
		    	
			  
		  	<a class="toolbar-btn btn-minus" href="#" @click="toggleToolbar()" v-if="toolbar_visible"><i class="fa fa-minus"></i></a>
		  	<a class="toolbar-btn btn-plus" href="#" @click="toggleToolbar()" v-else><i class="fa fa-plus"></i></a>
		</div>
		
	 
  	</div>




  	<div class="modal" tabindex="-1" role="dialog"  id="modal_config">
  		<div class="modal-dialog" role="document">
  			<div class="modal-content">
  				<div class="modal-header">
  					<h5 class="modal-title">Configurazione</h5>
  					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
  						<span aria-hidden="true">&times;</span>
  					</button>
  				</div>
  				<div class="modal-body">


  					<div class="row mb-2">
						<div class="col-sm-4"><label>Id dispositivo</label></div>
						<div class="col-sm-8">
							<input type="text" class="form-control" v-model="tmp_config.id">
						</div>

						
					</div>
  					
					<div class="row mb-2">
						<div class="col-sm-4"><label>Websocket Endpoint</label></div>
						<div class="col-sm-8">
							<input type="text" class="form-control" v-model="tmp_config.endpoint">
						</div>
					</div>

  				</div>
  				<div class="modal-footer">
  					<button type="button" class="btn btn-primary" @click="saveConfig">Salva</button>
  					<button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>
  
</template>

<script>

import router from './router';
import _ from 'lodash';

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  router,
  data: function(){
  	return {
  		connection: null,
  		config: {
  			id: null,
  			endpoint: null,
  		},
  		
  		toolbar_visible: false,
  		toolbar_command: '',
  		tmp_config: {},

  		current_page: '',

  		is_connected: false,
  		

  	}
  },
  mounted: function(){


  	// TODO caricare la configurazione locale

  	this.config.endpoint = '192.168.1.6:9999';
  	this.config.id = 'Tablet1';


  	this.connection = new WebSocket('ws://' + this.config.endpoint);

  	this.connection.onopen = () => {
  		this.current_page = 'PageHome';
  		router.push({ name: 'PageHome'});

  		this.is_connected = true;
	}

	this.connection.onclose = () => {
  		this.current_page = 'PageHome';
  		router.push({ name: 'PageHome'});

    	this.is_connected = false;
	
	}

	this.connection.onmessage = e => {

		this.toolbar_command = e.data;

		var message = JSON.parse( e.data );
		this.$store.commit('setMessage', message);

	  	switch(message.c){
	  		case 'setColor':
	  			this.current_page = 'PageColor';
	  			router.push({ name: this.current_page});
	  			break;
	  		case 'setImage':
	  			this.current_page = 'PageImage';
	  			router.push({ name: this.current_page});
	  			break;
	  		case 'setVideo':
	  			this.current_page = 'PageVideo';
	  			router.push({ name: this.current_page});
	  			break;
	  		// case 'playVideo':
	  		// 	router.push({ name: 'PageVideo'});
	  		// 	break;
	  		case 'setText':
	  			this.current_page = 'PageText';
	  			router.push({ name: this.current_page});
	  			break;
  			default:
  				//console.log('Route not found');
  				break;

	  	}
	}
  },
  methods: {
  	toggleToolbar : function(){
  		console.log('toggleToolbar');

  		this.toolbar_visible = this.toolbar_visible ? false : true;
  	},
  	toggleConfig : function(){
  		
  		this.tmp_config =  _.clone(this.config, true);
  		$('#modal_config').modal();
  		
  	},
  	saveConfig: function(){



  		

  		if(this.config.endpoint != this.tmp_config.endpoint){
  			this.connection = null;
  			this.is_connected = false;
  			console.log('Connecting to ' + this.tmp_config.endpoint);
  			this.connection = new WebSocket('ws://' + this.tmp_config.endpoint);
  		}

  		this.config =  _.clone(this.tmp_config, true);

  		$('#modal_config').modal('hide');
  	}
  },
  computed: {
  	toolbar_class : function(){
  		return this.toolbar_visible?'expanded':'';
  	},

  	

    ...mapState({
      feedback: state => state.feedback,
    }),


  },
  watch: {
  	feedback: function(new_value){
  		console.log(new_value);
  		this.connection.send(JSON.stringify(new_value));
  	},

  }
}
</script>

