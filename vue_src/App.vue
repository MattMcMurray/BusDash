<template>
  <div id="app">
    <nav-bar class="navbar"
             :loggedIn="loggedIn"
             :profileImgSrc="me.picture"
             @goToLogin="goToLogin"
             @goToConfig="goToMonitorConfig"
             @goHome="goHome"></nav-bar>

     <!--HOME SECTION-->
    <section v-if="pages.home" class="monitor-lockup" >
      <div class="container">
        <div class="column">
          <small class="refreshed-at"> Refreshed {{ lastRefresh }} <span class="subtle">({{ formattedNow }})</span></small>
          <bus-monitor v-for="monitor in getSortedArrivals" 
                       :key="monitor.arrival" 
                       :username="monitor.user" 
                       :route="monitor.route" 
                       :arrival="monitor.arrival"
                       :stop="monitor.stop"
                       :variant="monitor.variant"></bus-monitor>
        </div>
      </div>
    </section>

    <!--LOGIN SECTION-->
    <section v-if="pages.login" class="login-lockup">
      <login></login>
    </section>

    <section v-if="pages.monitors" class="config-lockup">
      <config></config>
    </section>


  </div>
</template>

<script>
import NavBar from './DashNav.vue'
import BusMonitor from './BusMonitor.vue'
import Login from './Login.vue'
import Config from './ConfigMonitors.vue'

export default {
  name: 'app',
  components: {NavBar, BusMonitor, Login, Config},
  data () {
    return {
      now: null,
      loggedIn: false,
      me: {},
      monitors: [],
      arrivals: [

      ],
      displayModal: false,
      pages: {
        home: true,
        login: false,
        monitors: false
      }
    }
  },

  computed: {
    getSortedArrivals: function() {
      var compare = function(a, b) {
        if (a.arrival < b.arrival)
          return -1;
        if (a.arrival > b.arrival)
          return 1
        return 0;
      } 
      return this.arrivals.sort(compare);
    },

    lastRefresh: function() {
      if (this.now) {
        return this.now.fromNow();
      }
      return ""
    },

    formattedNow: function() {
      if (this.now) {
        return this.now.format('h:mm:ss a');
      } 
      return ""
    }
  },

  methods: {
    getMonitors: function() {
      return axios.get('http://127.0.0.1:3000/api/monitors') //TODO after testing, change to relative path
        .then(response => {
          return response
        })
        .catch(err => {
          console.error(err);
          return null
        });
    },

    isLoggedIn: function() {
      return axios.get('/isLoggedIn')
    },

    setAllPagesFalse() {
      Object.keys(this.pages).forEach(v => this.pages[v] = false)
    },

    goToLogin() {
      this.setAllPagesFalse();
      this.pages.login = true;
    },

    goToMonitorConfig() {
      this.setAllPagesFalse();
      this.pages.monitors = true;
    },
    
    goHome() {
      this.setAllPagesFalse();
      this.pages.home = true;
      this.refreshMonitors(); 
    },

    refreshMonitors: function() {
      this.getMonitors()
      .then(data => {
        this.monitors = [];
        data.data.forEach(monitor => {
          this.monitors.push({
            user: monitor.user[0].profile.name,
            route: monitor.route,
            stop: monitor.stop
          })
        });

        return;
      })
      .then(() => {
        var transitPromises = [];

        // Set up a list of promises to get active monitors
        this.monitors.forEach(monitor => {
          var requestURI = '/api/stopSchedule?stop=' + monitor.stop + '&route=' + monitor.route; // TODO after testing, change to relative path
          let user = monitor.user;

          transitPromises.push(
            axios.get(requestURI)
              .then(response => {
                response.user = user;
                return response;
              })
              .catch(err => {
                return null;
              })
          );
        });

        // Once all requests have been fulfilled, update app data
        Promise.all(transitPromises).then(data => {
          this.arrivals = [];
          this.now = moment();
          data.forEach(arrival => {
            if (arrival.data.length > 0) {
              this.arrivals.push({
                user: arrival.user,
                route: arrival.data[0].route,
                arrival: moment(arrival.data[0].arrival),
                variant: arrival.data[0].variant,
                stop: arrival.data[0].stopNumber,
              });
            }
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
    }
  },

  mounted() {

    this.isLoggedIn()
      .then(result => {
        if (result.data.logged_in) {
          localStorage.setItem("logged_in", true)
          this.loggedIn = true;
          this.me = result.data.user;
        } else {
          localStorage.setItem("logged_in", false)
          this.loggedIn = false;
        }
      })
      .catch(err => {
        this.loggedIn = false;
        localStorage.setItem("logged_in", false)
        console.error(err);
      });

      this.refreshMonitors();
      var _this = this;
      window.setInterval(function(){
        _this.refreshMonitors();
      }, 30000);
  }
}
</script>

<style lang="scss">

body {
  background: #7474BF;  /* fallback for old browsers */
  /*background: -webkit-linear-gradient(to bottom, #348AC7, #7474BF);
  background: linear-gradient(to bottom, #348AC7, #7474BF);
  background-attachment: fixed;*/
  min-height: 100vh;
  background: linear-gradient(0deg, #7474bf, #348ac7);
  background-size: 200% 200%;

  -webkit-animation: AnimationName 10s ease infinite;
  -moz-animation: AnimationName 10s ease infinite;
  animation: AnimationName 10s ease infinite;
}

@-webkit-keyframes AnimationName {
    0%{background-position:45% 0%}
    50%{background-position:56% 100%}
    100%{background-position:45% 0%}
}
@-moz-keyframes AnimationName {
    0%{background-position:45% 0%}
    50%{background-position:56% 100%}
    100%{background-position:45% 0%}
}
@keyframes AnimationName { 
    0%{background-position:45% 0%}
    50%{background-position:56% 100%}
    100%{background-position:45% 0%}
}

#app {
  height: 100%;
}

.navbar {
  position: fixed;
  width: 100vw;
}

.monitor-lockup {
  padding-top: 5em;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-lockup {
  height: 100%;
  padding-top: 5em;
}

.config-lockup {
  padding-top: 5em;
  height: 100%;
}

.refreshed-at {
  color: white;
  margin-bottom: 1em;
}

.subtle {
  color: darken(white, 20%);
  opacity: 0.5;
}
</style>
