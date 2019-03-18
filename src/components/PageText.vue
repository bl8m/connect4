<template>
  <div class="app-page page-text d-flex justify-content-center align-items-center">
    <div v-html="text_content" :style="'font-size: ' + font_size + 'px'"></div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'PageText',
  data () {
    return {
      
    }
  },
  mounted: function(){
  	var self = this;
	self.$store.commit('setFeedback', { c: 'feedback', p :{type: 'text_set', message: 'Text set: ' + self.message.p.text }});
  },
  computed: {
    text_content: function(){
    	if(this.message != undefined)
      		return this.message.p.text;
      	else
      		return '';
    },

    font_size: function(){
    	if(this.message != undefined && this.message.p.font_size != undefined)
      		return this.message.p.font_size;
      	else
      		return 64;
    },
    ...mapState({
      message: state => state.message,
    })
  }
}
</script>

