<template>
  <div class="app-page page-home d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h1>Connect4</h1>
      <div class="badge badge-success" v-if="is_connected">Connected</div>
      <div class="badge badge-danger" v-else>Disconnected</div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'PageHome',
  data () {
    return {
      
    }
  },
  mounted: function(){
  	
  },
  computed: {
    ...mapState({
      is_connected: state => state.is_connected,
    }),

  },
}
</script>

