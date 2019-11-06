import Vue from 'vue'
import Vuex from 'vuex'

const store = new Vuex.Store({
    state:{
        perms:[]
    },
    mutations:{
        savePerms(state,buttenpremissions){
            state.perms = buttenpremissions
        }
    }
});

export default store