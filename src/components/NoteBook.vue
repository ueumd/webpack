<template>
  <div class="hello">
      {{msg}}
    <img src="../assets/logo.png">
  </div>
</template>

<script>
  export default {
    name: 'NoteBook',
    data() {
      return {
        msg: 'NoteBook'
      }
    },
    methods: {
      getJoke() {
        return fetch('https://api.apiopen.top/getJoke?page=1&count=2&type=video', {
          method: 'GET'
        }).then(res => {
          return res.json()
        })
      }
    },
    async mounted(){
      let res = await this.getJoke()
      console.log('res', res)
      let a = ['A', 'B']
      let b = [...a, 'C', 1, 3, 4]
      console.log(b)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
    background: url("../assets/cat.jpg");
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
