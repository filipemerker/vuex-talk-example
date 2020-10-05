<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="spinner-wrapper">
        <div class="spinner"></div>
      </div>
    </transition>
    <section class="display">
      <header>
        <h1 class="title">Meetup vue.js</h1>
        <p class="subtitle">Deep dive into VUEX - Filipe Merker</p>
      </header>
      <transition name="fade" mode="out-in">
        <div v-if="member.name" class="user-detail">
          <h2>Selected RSVP</h2>
          <img class="photo" v-if="member.photo && member.photo.photo_link" :src="member.photo.photo_link" />
          <h3>{{ member.name }}</h3>
        </div>
      </transition>
    </section>
    <transition-group name="fade" mode="out-in">
      <section key="rsvps" v-if="rsvps.length" class="user-list">
        <h2>RSVP List <div class="select">(<strong>click</strong> one)</div></h2>
        <ul>
          <li class="user" v-for="rsvp in rsvps" v-on:click="setMember(rsvp.member)">
            {{ rsvp.member.name }}
          </li>
        </ul>
      </section>
      <section key="declinedRsvpList" v-if="declinedRsvpList.length" class="user-list">
        <h2>Declined RSVP List</h2>
        <ul>
          <li class="user inactive" v-for="rsvp in declinedRsvpList">
            {{ rsvp.member.name }}
          </li>
        </ul>
      </section>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      loading: true
    }
  },
  methods: {
    setMember(member) {
      this.loading = true
      this.$store.dispatch('GET_MEMBER', member).then(() => {
        this.loading = false
      })
    }
  },
  mounted() {
    this.$store.dispatch('GET_RSVP_LIST')
      .then(() => {
        const [rsvp] = this.rsvps

        this.setMember(rsvp.member)
      })
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

  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
  .spinner-wrapper {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .4)
  }
  .spinner {
    background: #f7f7f7;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -20px;
    margin-left: -20px;
    box-sizing: border-box;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  .spinner:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -13px;
    margin-left: -13px;
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid #00c187;
    border-top-color: #f7f7f7;
    animation: spinner .6s linear infinite;
  }
  .title {
    font-weight: 900;
    font-size: 70px;
  }
  .select {
    display: inline-block;
    font-weight: 300;
    font-size: 14px;
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