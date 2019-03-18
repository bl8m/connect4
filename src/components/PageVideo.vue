<template>
  <div class="app-page page-video d-flex align-items-center">
    <video src="" id="video" preload="auto" class="w-100"></video>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'PageVideo',
  mounted: function(){
   
  	this.setVideo();
   

  },
  data () {
    return {
      //video_path: null,
    }
  },
  computed: {
    
    video_action: function(){ // wrapper

    	if(this.message.c == 'setVideo')
    		return 'load';
    	else if(this.message.c == 'playVideo')
    		return 'play';
    	else if(this.message.c == 'stopVideo')
    		return 'stop';
    	else
    		return null;

    },
    ...mapState({
      message: state => state.message,
    })
  },
  watch: {
  	video_action: function(new_value){
  		if(new_value == 'load'){
  	// 		this.video_path = './media/' + this.message.p.video;

  	// 		var vid = document.getElementById('video');
  	// 		vid.addEventListener("canplaythrough", function() {
  	// 			console.log('Ready to Play');
			// }, false);
			this.setVideo();
  		}
  		else if(new_value == 'play'){	
  			var vid = document.getElementById('video');
  			vid.play();
  		}
  		else if(new_value == 'stop'){	
  			var vid = document.getElementById('video');
  			vid.pause();
  		}
  	}
  },
  methods: {
  	setVideo: function(){
  		// this.video_path = './media/' + this.message.p.video;
  		var self = this;

		var vid = document.getElementById('video');
		vid.src = './media/' + this.message.p.video;
		vid.addEventListener("canplaythrough", function() {
			console.log('Ready to Play');
			self.$store.commit('setFeedback', { c: 'feedback', p :{type: 'video_ready', message: 'Video is ready: ' + self.message.p.video }});

		}, false);
  	}
  }
}
</script>


