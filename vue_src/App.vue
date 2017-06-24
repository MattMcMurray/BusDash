<template>
  <div id="app">
    <nav-bar :loggedIn="loggedIn"
             :profileImgSrc="me.picture"></nav-bar>

    <section class="monitor-lockup">
      <div class="container">
        <div class="column">
          <bus-monitor v-for="monitor in getSortedArrivals" 
                       :key="monitor.arrival" 
                       :username="monitor.user" 
                       :route="monitor.route" 
                       :arrival="monitor.arrival"></bus-monitor>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from './DashNav.vue'
import BusMonitor from './BusMonitor.vue'

export default {
  name: 'app',
  components: {NavBar, BusMonitor},
  data () {
    return {
      loggedIn: false,
      me: {},
      monitors: [],
      arrivals: [

      ]
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
    }
  },

  methods: {
    getMonitors: () => {
      return axios.get('http://127.0.0.1:3000/api/monitors') //TODO after testing, change to relative path
        .then(response => {
          return response
        })
        .catch(err => {
          console.error(err);
          return null
        });
    },

    isLoggedIn: () => {
      return axios.get('/isLoggedIn')
    }
  },
  mounted() {
    // App is ready, start processing

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

    this.getMonitors()
    .then(data => {
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
        var requestURI = 'http://localhost:3000/api/stopSchedule?stop=' + monitor.stop + '&route=' + monitor.route; // TODO after testing, change to relative path
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
        data.forEach(arrival => {
          this.arrivals.push({
            user: arrival.user,
            route: arrival.data[0].route,
            arrival: moment(arrival.data[0].arrival),
            variant: arrival.data[0].variant
          });
        });
      });
    })
    .catch(err => {
      console.error(err);
    });
  }
}
</script>

<style lang="scss">

body {
  background: #2c3e50;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #2c3e50, #0575E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #2c3e50, #0575E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-attachment: scroll;
  min-height: 100vh;
}

.monitor-lockup {
  padding-top: 1em;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
