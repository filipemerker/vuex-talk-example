import axios from 'axios'

const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
const key = 'e7207445366911631d262c542f3131';
const instance = axios.create({
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  baseURL: `${corsPrefix}https://api.meetup.com/`
})

const getRsvpList = () => instance.get(`Meetup-de-Vue-js-Porto-Alegre/events/241796363/rsvps?key=${key}&photo-host=public&sig_id=234792414&sig=4a6dfd4a3d24d85076603cd2c4327771d4425591`)
const getMember = id => instance.get(`2/member/${id}?&key=${key}&sign=true&photo-host=public&hash=${Math.random()}`)


export default {
  getRsvpList,
  getMember
}