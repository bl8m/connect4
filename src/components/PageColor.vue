<template>
  <div class="app-page" :style="'background-color: ' + background_color">

  </div>
</template>

<script>

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'PageColor',
  mounted: function(){
    this.$store.commit('setFeedback', { c: 'feedback', p :{type: 'color_set', message: 'Color is set: ' + this.message.p.color }});
  },
  data () {
    return {
      
    }
  },
  computed: {
    background_color: function(){
      return this.message.p.color;
    },
    ...mapState({
      message: state => state.message,
    })
  }
}
</script>

