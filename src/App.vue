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
          <div class="star-rating">
            <label class="star-rating__star"
              v-for="rating in ratings"
              v-bind:class="{selected: ((value >= rating && value != null))}"
              v-on:mouseover="starOver(rating)"
              v-on:mouseout="starOut(rating)"
              v-on:click="setRate(rating)">
                <input
                  class="star-rating star-rating__checkbox"
                  type="radio"
                  v-model="value">
                    ★
            </label>
          </div>
      </div>
      <p
      v-show="showMyrating">Your rating : {{value}}</p>
      <p
      v-show="showTMDB">
        Everyone else's rating : {{api_res_rating}}
      </p>
  </div>
</template>

<script>
// import VueInstant from 'vue-instant'
// import 'vue-instant/dist/vue-instant.css'
// Vue.use(VueInstant)
import axios from 'axios'
import Rating from 'vue-bulma-rating'

// const TMDB_api_key = '3afb334973093028cc5d28d0464b6383'
// const test = process.env.TMDB_API_KEY

export default {
  name: 'app',
  components: {
    Rating
  },
  data () {
    return {
      //rating component
      value: '',
      temp_value: '',
      ratings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      TMDB_api_key: '3afb334973093028cc5d28d0464b6383',
      msg: 'Fight for your tastes!',
      showForm: true,
      showRate: false,
      showTMDB: false,
      showMyrating: false,
      movie_name: '',
      api_res_name: '',
      api_res_overview: '',
      api_res_poster: '',
      api_res_rating: '',
      poster_base_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/'
    }
  },
  methods: {
    //rating component
    starOver: function (index) {
      this.temp_value = this.value
      this.value = index
    },

    starOut: function (index) {
      this.value = this.temp_value
    },

    setRate: function (value) {
      this.showRate = false
      this.temp_value = value
      this.value = value
      this.showTMDB = true
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.TMDB_api_key}&language=en-US&query=${this.movie_name}&page=1&include_adult=false`)
        .then(res => {
          this.api_res_rating = res.data.results[0].vote_average
        })
    },

    //triggered when submitting a movie name
    onSubmit: function () {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.TMDB_api_key}&language=en-US&query=${this.movie_name}&page=1&include_adult=false`)
        .then(res => {
          this.api_res_name = res.data.results[0].original_title
          this.api_res_overview = res.data.results[0].overview
          this.api_res_poster = this.poster_base_url + res.data.results[0].poster_path
        })
      this.showForm = false
      this.showRate = true
      this.showMyrating = true
    }
  }
}
</script>

<style>

.star-rating__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0; }

.star-rating__star {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 1.5em;
  color: #ababab;
  transition: color .2s ease-out;
}
.star-rating__star:hover {
  cursor: pointer;
}
.star-rating__star.selected {
  color: #c90000;
}
.star-rating__star.disabled:hover {
  cursor: default;
}

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
