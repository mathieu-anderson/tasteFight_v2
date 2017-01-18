<template>

  <!-- <nav class="navbar navbar-default">
     <div class="container">
       <ul class="nav navbar-nav">
         <li><a v-link="'home'">Home</a></li>
         <li><a v-link="'login'">Login</a></li>
         <li><a v-link="'signup'">Sign Up</a></li>
         <li><a v-link="'secretquote'">Secret Quote</a></li>
         <li><a v-link="'login'">Logout</a></li>
       </ul>
     </div>
   </nav>
   <div class="container">
     <router-view></router-view>
   </div> -->

  <div id="app">
    <h1>tasteFight</h1>
      <h2>{{msg}}</h2>
      <form
        v-show="showForm"
        v-on:submit.prevent="onSubmit">
          <input
          type="text"
          v-show="showForm"
          v-model="movie_name">
          <input
          type="submit"
          value="fight!"
          v-show="showForm"
          v-on:keyup.enter="submit">
      </form>
      <div id="movie_name"
        v-show="showForm">
          {{movie_name}}
      </div>
      <div class="api_res">
        <b>{{api_res_name}}</b>
        {{api_res_overview}}
        <!-- <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2//l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg">-->
        <img v-bind:src="api_res_poster">
      </div>
      <div class="rate"
        v-show="showRate">
        How do you rate it ?
      </div>
  </div>
</template>

<script>
// import VueInstant from 'vue-instant'
// import 'vue-instant/dist/vue-instant.css'
// Vue.use(VueInstant)
import axios from 'axios'

// const TMDB_api_key = '3afb334973093028cc5d28d0464b6383'
// const test = process.env.TMDB_API_KEY

export default {
  name: 'app',
  data () {
    return {
      TMDB_api_key: '3afb334973093028cc5d28d0464b6383',
      msg: 'Fight for your tastes!',
      showForm: true,
      showRate: false,
      movie_name: '',
      api_res_name: '',
      api_res_overview: '',
      api_res_poster: '',
      poster_base_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'
    }
  },
  methods: {
    onSubmit: function () {
      console.log(this.movie_name)
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.TMDB_api_key}&language=en-US&query=${this.movie_name}&page=1&include_adult=false`)
        .then(res => {
          this.api_res_name = res.data.results[0].original_title
          this.api_res_overview = res.data.results[0].overview
          this.api_res_poster = this.poster_base_url + res.data.results[0].poster_path
        })
      this.showForm = false
      this.showRate = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#movie_name {
  padding: 20px;
  font-size: 60px;
  font-style: italic;
}

h1 {
  font-size: 40px;
  font-weight: bold;
}

h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
