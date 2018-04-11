import api from '../api'

export default {
  GET_RSVP_LIST ({ commit, state }) {
    api.getRsvpList().then(payload => commit('SET_RSVP_LIST', payload.data))
  },
  GET_MEMBER ({ commit, state }, { id }) {
    api.getMember(id).then(payload => commit('SET_MEMBER', payload.data))
  }
}