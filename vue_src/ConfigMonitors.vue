<template>
    <div class="container form-container">
        <div class="box">
            <h1>Add a new monitor:</h1>
            <div class="form-group">
                <label for="input_route">Route #</label>
                <input type="text" placeholder="XX" class="form-control" id="input_route" v-model="newRoute">
                <small>2 or 3 digit number</small>
            </div>
            <div class="form-group">
                <label for="input_stop">Stop #</label>
                <input type="text" placeholder="XXXXX" class="form-control" id="input_stop" v-model="newStop">
                <small>5 digit stop number</small>
            </div>
            <button type="submit" @click="createNewMonitor">Submit</button>
        </div>

        <section class="my-monitors">
            <h1 class="white-title">Your existing monitors:</h1>
            <div class="box" v-for="(monitor, index) in sortedMonitors">
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <h1 class="route-num">{{ monitor.route }}</h1>
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong> {{ monitor.stop }} — <span>{{ monitor.commonName }}</span></strong>
                                <a class="is-pulled-right" @click="deleteMonitor(monitor, index)">
                                    <span class="icon"><i class="fa fa-trash"></i></span>
                                </a>
                            </p>
                            <p>
                                <small> Added: {{ getFormattedDate(monitor.createdAt) }}</small>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Config',
    data() {
        return {
            myMonitors: [],
            newRoute: null,
            newStop: null
        }
    },

    methods: {
        getMyMonitors() {
            var _this = this;
            axios.get('/api/monitors/me')
            .then(function(response) {

                response.data.forEach(monitor => {
                    _this.updateStopInfo(monitor);
                });

                _this.myMonitors = response.data;
            })
            .catch(function(err) {
                console.error(err);
            });
        },

        getFormattedDate: function(date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        },

        deleteMonitor: function(monitor, index) {
            axios.post('/api/monitors/delete', {
                monitor: {
                    id: monitor._id
                },
                user: {
                    id: monitor.user[0]
                }
            })
            .then(result => {
                if (result.status === 200) {
                    this.myMonitors.splice(index, 1);
                }
            })
            .catch(err => {
                console.error(err);
            });
        },

        createNewMonitor: function() {
            axios.post('/api/monitors/', {
                route: this.newRoute,
                stop: this.newStop,
                start_at: moment()
            })
            .then(result => {
                if (result.status === 200) {
                    this.newRoute = null;
                    this.newStop = null;
                    this.updateStopInfo(result.data);
                    this.myMonitors.push(result.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },

        updateStopInfo: function(monitor) {
            axios.get('/api/stopInfo?stop=' + monitor.stop)
                .then(result => {
                    monitor.commonName = result.data.stop.name;
                    this.$forceUpdate();
                })
                .catch(err => {
                    console.error(err);
                });
        }

    },

    computed: {
        sortedMonitors: function() {
            var compare = function (a, b) {
                if (a.createdAt > b.createdAt)
                    return -1;
                if (a.createdAt < b.createdAt)
                    return 1
                return 0;
            }
            return this.myMonitors.sort(compare);
        },
    },
    
    mounted() {
        this.getMyMonitors();

    }
}
</script>

<style lang="scss">
.form-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 100%;
}

h1 {
    font-size: 2em;
    margin-bottom: 10px;
}

.white-title {
    color: #ecf0f1
}

</style>fa fa-trash