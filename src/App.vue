<template>
  <div id="app">
    <h1>tasteFight</h1>
      <h2>{{msg}}</h2>
      <form v-show="showForm" v-on:submit.prevent="onSubmit" class="submitMovie">
        <input type="text" name="" value="" v-model="movie_name">
        <input type="submit" name="submit" id="submit" value="fight!" v-on:keyup.enter="submit">
      </form>
      <div id="movie_name">{{movie_name}}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Fight for your tastes!',
      showForm: true,
      movie_name: ''
    }
  },
  methods: {
    onSubmit: function () {
      console.log(this.movie_name)
      return this.showForm = false
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

.submitMovie {
  padding: 20px;
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
