import api from '../api'

export default {
  GET_RSVP_LIST ({ commit, state }) {
    return api.getRsvpList().then(payload => commit('SET_RSVP_LIST', payload.data))
  },
  GET_MEMBER ({ commit, state }, { id }) {
    return api.getMember(id).then(payload => commit('SET_MEMBER', payload.data))
  }
}