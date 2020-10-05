import axios from 'axios'

const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
const key = 'e7207445366911631d262c542f3131';
const instance = axios.create({
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  baseURL: `${corsPrefix}https://api.meetup.com/`
})

const getRsvpList = () => instance.get(`Meetup-de-Vue-js-Porto-Alegre/events/241796363/rsvps`)
const getMember = id => instance.get(`2/member/${id}?&key=${key}&sign=true&photo-host=public&hash=${Math.random()}`)

export default {
  getRsvpList,
  getMember
}
