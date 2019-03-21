<template>
	<div id="app">
		
		<router-view/>

		<div :class="'row toolbar  no-gutters ' + toolbar_class">


			<div class="col-sm-6" v-if="toolbar_visible">
				<div class="toolbar-log" >
					<span class="badge badge-primary">{{ config.id }}</span> 
					<span class="badge badge-secondary">{{ current_page }}</span>
					<span :class="is_connected?'badge badge-success':'badge badge-danger'">{{ is_connected?'Connected':'Disconnected' }}</span>
					<span :class="has_native_storage?'badge badge-success':'badge badge-warning'">{{ has_native_storage?'Native Storage':'Local Storage' }}</span>
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


						<div class="row mb-2" v-if="!is_connected">
							<div class="col-sm-12">
								<a href="#" @click.prevent="initConnection(false)" class="btn">Connetti</a>
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


	const CONFIG_STORAGE_VAR = 'connect4_config';

	export default {
		name: 'App',
		router,
		data: function(){
			return {
				connection: null,
				

				toolbar_visible: false,
				toolbar_command: '',
				tmp_config: {},

				current_page: '',

				is_connected: false,


			}
		},
		mounted: function(){

		// TODO caricare la configurazione locale


		
		this.loadConfig();
		//this.$store.commit('setEndpoint', this.config.endpoint);


		},
	methods: {

		initConnection: function( activate_listener = true){

			console.log('Opening connection to ' + this.config.endpoint);
			
			this.connection = new WebSocket('ws://' + this.config.endpoint);

			if( activate_listener == true){
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
					//  router.push({ name: 'PageVideo'});
					//  break;
					case 'setText':
					this.current_page = 'PageText';
					router.push({ name: this.current_page});
					break;
					default:
						//console.log('Route not found');
						break;

					}
				}
			}

			
		},


		closeConnection(){
			console.log('Closing connection');
			this.connection = null;
			this.is_connected = false;
		},

		toggleToolbar : function(){
			console.log('toggleToolbar');

			this.toolbar_visible = this.toolbar_visible ? false : true;
		},

		toggleConfig : function(){
			
			this.tmp_config =  _.clone(this.config, true);
			$('#modal_config').modal();
			
		},

		loadConfig: function(){

			console.log('loadConfig from ' + (this.has_native_storage?'NATIVE STORAGE':'LOCAL STORAGE') );

			var config = {};
			var storage_type = '';

			if(this.has_native_storage){
				storage_type = 'NATIVE STORAGE';
				NativeStorage.getItem(CONFIG_STORAGE_VAR, function(obj){
					config.id = obj.id;
					config.endpoint = obj.endpoint;
				});
				console.log( config );
			}
			else{
				storage_type = 'LOCAL STORAGE';
				var config_saved_json = window.localStorage.getItem(CONFIG_STORAGE_VAR);
				config = JSON.parse(config_saved_json);
			}


			if( config.id == undefined || config.endpoint == undefined ){
				console.log( 'loadConfig: configurazione salvata NON TROVATA' );
				config = {

									endpoint : '192.168.1.6:9999',
									id : 'Tablet1'
								};	
			}


			// modifico l'endpoint se lo ricevo dalla url (solo web)
			if(this.$route.params.endpoint != undefined){
				config.endpoint = this.$route.params.endpoint;
			}


			this.$store.commit('setConfig', config)
		},

		saveConfig: function(){

			var new_config =  _.clone(this.tmp_config, true);
			this.$store.commit('setConfig', new_config );

			if(this.has_native_storage){
				console.log( 'saveConfig: salvo la configurazione in NATIVE STORAGE' );
				NativeStorage.setItem(CONFIG_STORAGE_VAR, new_config);
			}
			else{
				console.log( 'saveConfig: salvo la configurazione in LOCAL STORAGE' );
				var new_config_json = JSON.stringify(new_config);
				window.localStorage.setItem(CONFIG_STORAGE_VAR, new_config_json);
			}

			$('#modal_config').modal('hide');
		}
	},
	computed: {
		toolbar_class : function(){
			return this.toolbar_visible?'expanded':'';
		},

		...mapState({
			
			config: state => state.config,
			feedback: state => state.feedback,
		}),


		endpoint: function(){ 
			return this.config.endpoint 
		},

		id: function(){ 
			return this.config.id 
		},
		
		has_native_storage: function(){
			return ( typeof NativeStorage !== 'undefined' ? true : false );
		},
		

	},
	watch: {
		endpoint: function(new_value){

			if(this.is_connected){
				this.closeConnection();
			}

			this.initConnection();
		},

		feedback: function(new_value){

			var message = {
				c: 'feedback',
				i: this.id,
				p: new_value
			};

			this.connection.send(JSON.stringify(message));
		},

	}
}
</script>

