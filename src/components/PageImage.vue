<template>
  <div class="app-page page-image">
  <img :src="background_image" alt="">
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'PageImage',
  mounted: function(){
  	var self = this;
    console.log('Showing ' + self.message.p.image);
  	if(self.message.p != undefined){
  		self.$store.commit('setFeedback',{type: 'image_set', message: 'Image set: ' + self.message.p.image });
  	}
  },
  data () {
    return {
      
    }
  },
  computed: {
    background_image: function(){
    	var image = './media/' + this.message.p.image;
      console.log('Setting image ' + image);
      return image;
    },
    ...mapState({
      message: state => state.message,
    })
  }
}
</script>

