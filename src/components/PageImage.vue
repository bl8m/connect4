<template>
  <div class="app-page page-image" :style="'background-image: url(' + background_image">
    
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'PageImage',
  mounted: function(){
  	var self = this;
  	if(self.message.p != undefined){
  		self.$store.commit('setFeedback', { c: 'feedback', p :{type: 'image_set', message: 'Image set: ' + self.message.p.image }});
  	}
  },
  data () {
    return {
      
    }
  },
  computed: {
    background_image: function(){
    	var image = './media/' + this.message.p.image;
      return image;
    },
    ...mapState({
      message: state => state.message,
    })
  }
}
</script>

