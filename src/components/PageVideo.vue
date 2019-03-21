<template>
  <div class="app-page page-video d-flex align-items-center">
    <video src="" id="video" preload="auto" class="w-100" mute></video>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'PageVideo',
  created: function(){
   
    //this.setVideo();
   

  },
  mounted: function(){
   
  	this.setVideo();
   

  },
  data () {
    return {
      video_notification: false
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
      console.log('Setting video ' + './media/' + this.message.p.video);
  		var self = this;

		  var vid = document.getElementById('video');



		  
		  vid.addEventListener("canplaythrough canplay loadedmetadata", function() {
        
            self.video_notification = true;
			     console.log('Ready to Play');
			     self.$store.commit('setFeedback', {type: 'video_ready', message: 'Video is ready (event)'} );
        

		  }, false);


      vid.src = './media/' + this.message.p.video;


      if(this.message.p.fakePreload == 1){
        
        vid.addEventListener('play', this.handlePlay);

        const playPromise = vid.play();
        if (playPromise !== null){
            playPromise.catch((e) => { console.log(e.message);  })
        }
        self.$store.commit('setFeedback', {type: 'video_ready', message: 'Video is ready (fake preload)'} );
      }
  	},

    handlePlay: function(){
      console.log( 'handlePlay');
      var vid = document.getElementById('video');
      vid.pause();
      vid.removeEventListener('play', this.handlePlay);
    },




  }
}
</script>


