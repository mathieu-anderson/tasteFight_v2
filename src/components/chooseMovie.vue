<template lang="html">

<div>

  <div class="api_res_list"
    v-show="showList">
    <span class="big">Did you mean ...</span>
    <ul>
      <li
        v-for="movie in api_res_movie_list"
        v-on:click="onChoosing(movie.original_title, movie.release_date)">
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

</div>

</template>

<script>

import axios from 'axios'

export default {

  name: 'chooseMovie',

  data () {
    return {
      showList: false,
      showRate: false,
      showAPIRes: false,
      movie_name: '',
      TMDB_api_key: '3afb334973093028cc5d28d0464b6383',
      api_res_movie_list: '',
      api_res_name: '',
      api_res_overview: '',
      api_res_poster: '',
      api_res_ID: '',
      poster_base_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/',
    }
  },

  methods: {
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
  }
}
</script>

<style lang="css">
</style>
