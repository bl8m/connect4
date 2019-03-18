import _ from 'lodash';

export default {
  state: {
    message: {},
    feedback: {},
  },
  mutations: {
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
