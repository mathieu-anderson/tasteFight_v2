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

  <div id="app" class="container">

    <h1 v-on:click="reload()">tasteFight</h1>

        <form
          v-show="showForm"
          v-on:submit.prevent="onSubmit">
            <input
            type="text"
            placeholder="a movie to argue about"
            v-show="showForm"
            v-model="movie_name">
            <input
            type="submit"
            value="👊"
            v-show="showForm"
            v-on:keyup.enter="submit">
        </form>

        <div class="api_res_list"
          v-show="showList">
          <span class="big">Did you mean ...</span>
          <ul>
            <li
              v-for="movie in api_res_movie_list"
              v-on:click="onChoosing(movie.original_title, movie.release_date)"
              v-on:hover="embolden()">
                <i>{{movie.original_title}}</i>
                ({{movie.release_date[0]}}{{movie.release_date[1]}}{{movie.release_date[2]}}{{movie.release_date[3]}})
                <!-- <img v-bind:src="poster_base_url + movie.poster_path"> -->
            </li>
          </ul>
          <span v-on:click="reload()" class="big pointer">↵</span>
        </div>

        <div class="api_res"
        v-show="showAPIRes">
          <img v-bind:src="api_res_poster">
          <table>
            <tr>
              <td class="big"><i>{{api_res_name}}</i></td>
            </tr>
            <tr>
              <td>{{api_res_overview}}</td>
            </tr>
          </table>
        </div>

        <!-- <div class="rate"
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
          ♥
          </label>
        </div>
      </div> -->
      <Rating></Rating>

    <p
    v-show="showTMDB">
      <table>
        <tr>
          <td class="rating_head"> Your rating</td>
          <td class="rating_head">{{api_res_number_of_votes}} people's rating</td>
          <td class="rating_head">RandomProfileName's rating</td>
        </tr>
        <tr>
          <td class="rating_values">{{value}}</td>
          <td class="rating_values">{{api_res_rating}}</td>
          <td class="rating_values">1</td>
        </tr>
        <tr>
          <td>
            <a class="button"
              v-on:click="reload()">
                Again?
            </a>
          </td>
          <td>
            <a class="button"
              v-bind:href="go_to_TMDB"
              v-on:mouseover="goToTMDB()"
              target="_blank">
              Fight with {{api_res_number_of_votes}} people?
            </a>
          </td>
          <td>
            <a class="button"
              v-bind:href="go_to_TMDB"
              v-on:mouseover="goToTMDB()"
              target="_blank">
              Fight with RandomProfileName?
            </a>
          </td>
        </tr>
      </table>
    </p>

  </div>

</template>

<script>
// import VueInstant from 'vue-instant'
// import 'vue-instant/dist/vue-instant.css'
// Vue.use(VueInstant)
import axios from 'axios'
import Rating from './components/rating'


// const TMDB_api_key = '3afb334973093028cc5d28d0464b6383'
// const test = process.env.TMDB_API_KEY

export default {
  name: 'app',
  components: {
    rating
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
      showAPIRes: false,
      showList: false,
      movie_name: '',
      movie_chosen: '',
      api_res_movie_list: '',
      api_res_name: '',
      api_res_overview: '',
      api_res_poster: '',
      api_res_rating: '',
      api_res_number_of_votes: '',
      api_res_link: '',
      api_res_ID: '',
      poster_base_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/',
      go_to_TMDB: ''
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
      this.temp_value = value
      this.value = value
      this.showRate = false
      this.showTMDB = true
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.TMDB_api_key}&language=en-US&query=${this.movie_name}&page=1&include_adult=false`)
        .then(res => {
          this.api_res_rating = res.data.results[0].vote_average
          this.api_res_number_of_votes = res.data.results[0].vote_count
        })
    },

    //triggered when submitting a movie name -> get list of movies matching the movie_name
    onSubmit: function () {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.TMDB_api_key}&language=en-US&query=${this.movie_name}&page=1&include_adult=false`)
        .then (res => {
          this.showForm = false
          this.showList = true
          const movie_list = res.data.results.slice(0, 5)
          if (movie_list.length === 0) {
            alert("nothing found :(")
            this.reload()
          } else {
          this.api_res_movie_list = movie_list}
        })
        .catch(err => this.reload())
    },

    // triggered on clicking a movie in the api_res_movie_list : send exact name + year request to the api
    onChoosing: function (movie_title, movie_date) {
      const movie_year = movie_date.slice(0, 4)
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.TMDB_api_key}&language=en-US&query=${movie_title}&page=1&include_adult=false&year=${movie_year}`)
      .then(res => {
        this.showList = false
        this.showRate = true
        this.showAPIRes = true
        this.showMyrating = true
        this.api_res_poster = this.poster_base_url + res.data.results[0].poster_path
        this.api_res_name = res.data.results[0].original_title
        this.api_res_overview = res.data.results[0].overview
        this.api_res_ID = res.data.results[0].id
      })
      .catch(err => this.reload())
    },

    //go to movie page on TMDB
    goToTMDB: function () {
      this.go_to_TMDB = 'https://www.themoviedb.org/movie/' + this.api_res_ID
    },

    //reset all values
    reload: function () {
      this.showForm = true
      this.showAPIRes = false
      this.showRate = false
      this.showMyrating = false
      this.showTMDB = false
      this.showList = false
      this.api_res_movie_list = ''
      this.movie_name = ''
      this.api_res_name = ''
      this.api_res_overview = ''
      this.api_res_poster = ''
      this.api_res_rating = ''
      this.value = ''
      this.temp_value = ''
    }
  }
}
</script>

<style>

.pointer {
  cursor: pointer;
}

.big {
  font-size: 18pt;
}

.rating_head {
  font-size: 14pt;
  font-weight: bold;
}

.rating_values {
  font-size: 20pt;
  font-weight: bold;
}

table {
  margin-left: auto;
  margin-right: auto;
}

td {
  padding-left: 20pt;
  padding-right: 20pt;
}

.button {
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;

    text-decoration: none;
    color: initial;

    padding: 15pt;

    font-size: 14px;

    cursor: pointer;

}
input {
  font-size: 30pt;
  padding: 2%;
}

img  {
  max-width: 45vw;
  max-height: 45vh;
  width: auto;
  height: auto;
  margin-right: 1vw;
}

.container {
  display: flex;
  flex-direction: column;
}

.api_res {
  display: flex;
  flex-direction: row;
  text-align: left;
  padding: 2vh;
  margin-left: 20vw;
  margin-right: 65vh;
}

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


}

#movie_name {
  padding: 20px;
  font-size: 60px;
  font-style: italic;
}

h1 {
  font-size: 40pt;
  font-weight: bold;
text-shadow: 1px 1px 4px rgba(150, 150, 150, 0.98);
cursor: pointer;
}

h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  margins: 25vw;
}

li {
  padding: 1vh;
  cursor: pointer;
}

a {
  color: #42b983;
}

</style>
