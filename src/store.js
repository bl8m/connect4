import _ from 'lodash';

export default {
  state: {
    // endpoint: null,

    
    config: {
          id: null,
          endpoint: null,
        },

    message: {},
    feedback: {},
  },
  mutations: {
    // setEndpoint: function(state, endpoint){
    //   state.config.endpoint = endpoint;
    // },
    // setId: function(state, id){
    //   state.config.id = id;
    // },
    setConfig: function(state, config){
      state.config = config;
    },

    setMessage: function(state, message){
      state.message = message;
    },
    setFeedback: function(state, feedback){
      state.feedback = feedback;
    }
    
  },
  getters: {

    getCommand: state => {
      return state.message.c;
    },
    getParams: state => {
      return state.message.p;
    },

    
  }
};
