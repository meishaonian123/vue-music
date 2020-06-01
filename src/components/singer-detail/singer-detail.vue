<template>
  <transition name="slide">
    <div class="singer-detail">
       <MusicList :title="title" :bgImage="bgImage" :songs="songs"></MusicList>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
// import {getSongVkey} from 'api/song'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      songs: []
    }
  },
  created() {
    // console.log(this.singer)
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.list)
          this.songs = this._normalizeSongs(res.data.list)
          // console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let musicData = item.musicData
        // console.log(musicData)
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
      // let ret = []
      // list.forEach(async item => {
      //   let musicData = item.musicData
      //   // ------------- 更新的加上vkey
      //   let res = await getSongVkey(musicData.songmid)
      //   const songVkey = res.data.items[0].vkey
      //   // 这两个id是必须的，有这两个id值才创建一个歌曲条目// && songVkey != ""
      //   if (musicData.songid && musicData.albummid) {
      //     ret.push(createSong(musicData, songVkey))
      //   }
      // })
      // console.log(ret)
      // return ret
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

 .slide-enter-active, .slide-leave-active
    transition: all 0.3s
 .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
