<template>
  <div id="app">
    <section class="display">
      <header>
        <h1 class="title">Meetup vue.js</h1>
        <p class="subtitle">Deep dive into VUEX - Filipe Merker</p>
      </header>
      <transition name="fade" mode="out-in">
        <div v-if="member.name" class="user-detail">
          <h2>Usuário selecionado</h2>
          <img class="photo" v-if="member.photo && member.photo.photo_link" :src="member.photo.photo_link" />
          <h3>{{ member.name }}</h3>
        </div>
      </transition>
    </section>
    <section class="user-list">
      <h2>Participantes</h2>
      <ul>
        <li class="user" v-for="rsvp in rsvps" v-on:click="setMember(rsvp.member)">
          {{ rsvp.member.name }}
        </li>
      </ul>
    </section>
    <section class="user-list">
      <h2>Não comparecerão</h2>
      <ul>
        <li class="user inactive" v-for="rsvp in declinedRsvpList">
          {{ rsvp.member.name }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    setMember(member) {
      this.$store.dispatch('GET_MEMBER', member)
    }
  },
  mounted() {
    this.$store.dispatch('GET_RSVP_LIST')
  },
  computed: {
    member() {
      return this.$store.state.member
    },
    rsvps() {
      return this.$store.state.rsvps
    },
    declinedRsvpList() {
      return this.$store.getters.declinedRsvpList
    }

  }
}
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  body {
    margin: 0px;
    font-family: 'Roboto', sans-serif;
  }
  .display {
    text-align: center;
    background: -webkit-linear-gradient(to right, #00c187, #2e475f);
    background: linear-gradient(to right, #00c187, #2e475f);
    display: inline-block;
    width: 100%;
    color: white;
  }
  .title {
    font-weight: 900;
    font-size: 70px;
  }
  .subtitle {
    font-size: 28px;
    font-weight: 100;
    margin-bottom: 60px;
    margin-top: -2em;
    color: rgba(255, 255, 255, 0.69);
  }
  .user-detail {
    display: inline-block;
    background: rgba(0, 0, 0, 0.68);
    padding: 0px 40px;
    margin-bottom: 30px;
    border-radius: 3px;

    h2, h3 {
      font-weight: 100;
    }
  }
  .photo {
    border-radius: 50%;
    height: 200px;
    width: 200px;
  }
  .user-list {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0px 20px;

    h2 {
      color: #2c4d61;
    }

    ul {
      padding: 0px;
    }
  }
  .user {
    list-style: none;
    display: inline-block;
    background: rgba(255, 0, 0, 0.23);
    margin: 0px 3px 6px;
    padding: 3px 9px;
    font-size: 16px;
    border-radius: 2px;
    color: #040404;
    font-weight: 300;

    transition: all .15s linear;

    &:not(.inactive) {
      cursor: pointer;
      background: rgba(45, 73, 95, 0.25);
      &:hover {
        background: rgba(45, 73, 95, 0.45);
      }
    }
  }
</style>