<template>
  <scroll ref="suggest" class="suggest"
     :data="result"
     :pullup="pullup"
     @scrollToEnd="searchMore"
     :beforeScroll="beforeScroll"
     @beforeScroll="listScroll"
     >
      <ul class="suggest-list">
        <li class="suggest-item" v-for="(item, index) in result" 
            :key="index"
            @click="selectItem(item)"
            >
          <div class="icon">
             <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
             <p class="text" v-html="getDisplayName(item)"></p>
          </div>
        </li>
        <loading v-show="hasMore"></loading>
      </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
 import {search} from 'api/search'
 import {ERR_OK} from 'api/config'
 import {createSong} from 'common/js/song'
 import Scroll from 'base/scroll/scroll'
 import Loading from 'base/loading/loading'
 import Singer from 'common/js/singer'
 import {mapMutations, mapActions} from 'vuex'
 const perpage = 20
 const TYPE_SINGER = 'singer'
 export default {
   data () {
     return {
       result: [],
       page: 1,
       pullup: true,
       hasMore: true,
       beforeScroll: true
     }
   },
   props: {
     showSinger: {
       type: Boolean,
       default: false
     },
     query: {
       type: String,
       default: ''
     }
   },
   created() {
   },
   methods: {
     listScroll() {
       this.$emit('listScroll')
     },
     selectItem(item) {
       if (item.type === TYPE_SINGER) {
         const singer = new Singer({
           id: item.singermid,
           name: item.singername
         })
         this.$router.push({
           path: `/search/${singer.id}`
         })
         this.setSinger(singer)
       } else {
         this.insertSong(item)
       }
       this.$emit('select')
     },
     search() {
       this.page = 1
       this.hasMore = true
       this.$refs.suggest.scrollTo(0, 0)
       search(this.query, this.page, this.showSinger, perpage).then((res) => {
         if (res.code === ERR_OK) {
          //  console.log(res)
           this.result = this._genResult(res.data)
           this._checkMore(res.data)
         }
       })
     },
     _genResult(data) {
       let ret = []
       if (data.zhida && data.zhida.singerid) {
         ret.push(...data.zhida, ...{type: TYPE_SINGER})
       }
       if (data.song) {
         ret = ret.concat(this._normalizeSongs(data.song.list))
       }
      //  console.log(ret)
       return ret
     },
     _normalizeSongs(list) {
       let ret = []
       list.forEach((musicData) => {
         if (musicData.songid && musicData.albummid) {
           ret.push(createSong(musicData))
         }
       })
      //  console.log(ret)
       return ret
     },
     getIconCls(item) {
       if (item.type === TYPE_SINGER) {
         return 'icon-mine'
       } else {
         return 'icon-music'
       }
     },
     getDisplayName(item) {
       if (item.type === TYPE_SINGER) {
         return item.singername
       } else {
         return `${item.name}-${item.singer}`
       }
     },
     searchMore() {
       if (!this.hasMore) {
         return
       }
       this.page++
      //  console.log(this.page)
       search(this.query, this.page, this.showSinger, perpage).then((res) => {
         if (res.code === ERR_OK) {
          //  console.log(res)
           this.result = this.result.concat(this._genResult(res.data))
         }
       })
     },
     _checkMore(data) {
       const song = data.song
       if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
         this.hasMore = false
       }
     },
     ...mapMutations({
       setSinger: 'SET_SINGER'
     }),
     ...mapActions([
       'insertSong'
     ])
   },
   watch: {
     query() {
       this.search()
     }
   },
   components: {
     Scroll,
     Loading
   }
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
 
</style>
