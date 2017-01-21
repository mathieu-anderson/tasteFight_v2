<template lang="html">
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
    ♥
    </label>
  </div>
  </div>
</template>

<script>
export default {
  name: 'rating',
  data () {
    return {
      value: '',
      temp_value: '',
      ratings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },

  methods : {
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
    }
  }
}
</script>

<style lang="css">

.rating_head {
  font-size: 14pt;
  font-weight: bold;
}

.rating_values {
  font-size: 20pt;
  font-weight: bold;
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

</style>
