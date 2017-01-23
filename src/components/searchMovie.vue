<template lang="html">

<div>

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

  <chooseMovie></chooseMovie>

</div>

</template>

<script>

import axios from 'axios'
import chooseMovie from './chooseMovie.vue'


export default {

  name: 'searchMovie',

  components: {
    chooseMovie
  },

  data () {
    return {
      showForm: true,
      showList: false,
      movie_name: '',
      TMDB_api_key: '3afb334973093028cc5d28d0464b6383',
      api_res_movie_list: ''
    }
  },

  methods: {
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
    }
  }
}
</script>

<style lang="css">
</style>
