<template>
  <div class="app-page page-text d-flex justify-content-center align-items-center" :style="bodyStyle">
    <div v-html="text_content" :style="textStyle"></div>
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

    textStyle: function(){
      var style = '';

      if(this.message != undefined){
        if(this.message.p.fontSize != undefined){
          style += 'font-size: ' + this.message.p.fontSize + 'px; ';
        }

        if(this.message.p.color != undefined){
          style += 'color: ' + this.message.p.color + '; ';
        }

      }
      return style;
    },

    bodyStyle: function(){
      var style = '';

      if(this.message != undefined){

        if(this.message.p.backgroundColor != undefined){
          style += 'background-color: ' + this.message.p.backgroundColor + '; ';
        }
      }
      return style;
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

