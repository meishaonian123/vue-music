<template>
  <div class="m-header">
      <div class="icon"></div>
      <h1 class="text">Music</h1>
      <router-link to="/user" class="mine" tag="div">
          <i class="icon-mine"></i>
      </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {

      }
    },
    components: {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin" 
    .m-header 
        height: 44px
        text-align: center
        position: relative
        font-size: 0
        .icon 
            display: inline-block
            width: 30px
            height: 32px
            bg-image('logo')
            background-size: 30px 30px
            vertical-align: top
            margin-top: 5px
            margin-right: 3px
        .text
            display: inline-block
            vertical-align: top
            line-height: 44px
            font-size: $font-size-large
        .mine
            position: absolute
            right: 0
            top: 0
            .icon-mine
                display:inline-block
                font-size: 20px
                color: $color-theme
                padding: 12px
                color: $color-theme
</style>
