export default {
  declinedRsvpList: state => {
    return state.rsvps.filter(rsvp => rsvp.response === 'no')
  }
}