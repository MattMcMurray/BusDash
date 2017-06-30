<template>
    <div class="container form-container">
        <div class="box">
            <h1>Add a new monitor:</h1>
            <div class="form-group">
                <label for="input_route">Route #</label>
                <input type="text" placeholder="XX" class="form-control" id="input_route">
                <small>2 or 3 digit number</small>
            </div>
            <div class="form-group">
                <label for="input_stop">Stop #</label>
                <input type="text" placeholder="XXXXX" class="form-control" id="input_stop">
                <small>5 digit stop number</small>
            </div>
            <button type="submit">Submit</button>
        </div>

        <section class="my-monitors">
            <h1 class="white-title">Your existing monitors:</h1>
            <div class="box" v-for="monitor in myMonitors">
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <h1 class="route-num">{{ monitor.route }}</h1>
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong> {{ monitor.stop }}</strong>
                            </p>
                            <p>
                                <small> {{ getFormattedDate(monitor.createdAt) }}</small>
                            </p>
                        </div>
                            <nav class="level is-mobile">
                                <div class="level-left">
                                    <a class="level-item" @click="deleteMonitor(monitor)">
                                        <span class="icon is-small"><i class="fa fa-trash"></i></span>
                                    </a>
                            </nav>
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
            myMonitors: []
        }
    },

    methods: {
        getMyMonitors() {
            var _this = this;
            axios.get('/api/monitors/me')
            .then(function(response) {
                _this.myMonitors = response.data;
            })
            .catch(function(err) {
                console.error(err);
            });
        },

        getFormattedDate: function(date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        },

        deleteMonitor: function(monitor) {
            axios.post('/api/monitors/delete', {
                monitor: {
                    id: monitor._id
                },
                user: {
                    id: monitor.user[0]
                }
            })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.error(err);
            });
        }
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