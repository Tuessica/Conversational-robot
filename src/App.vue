<template>
  <div id="app" class="wrapper">
    <itemTalk />
    <JwChat-index
      :config="config" 
      :taleList="list"
      @enter="bindEnter"
      v-model="inputMsg"
      :toolConfig="tool"
      :showRightBox='false'
      scrollType="norell"
      @clickTalk="talkEvent"
    >
      <!-- <JwChat-rightbox class="rightSlot" :config="rightConfig" @click="rightClick" /> -->
      <!-- <JwChat-talk class="rightSlot" :Talelist="talk" :config="quickConfig" @event="bindTalk" /> -->
      <b slot="tools">H</b>
    </JwChat-index>
  </div>
</template>

<script>
import itemTalk from '@/components/Chat/itemTalk'
import moment from 'moment'

export default {
  components: { itemTalk },
  data () {
    return {
      num: 5000,
      inputMsg: '',
      list: [],
      tool: {
        // show: ['file', 'history', 'img', ['文件1', '', '美图']],
        // showEmoji: false,
        callback: this.toolEvent
      },
      rightConfig: {
        listTip: '当前在线',
        // notice: '【公告】这是一款高度自由的聊天组件，基于AVue、Vue、Element-ui开发。点个赞再走吧 ',
        list: [
          {
            name: 'JwChat',
            "img": "image/three.jpeg"
          },
          {
            name: 'JwChat',
            "img": "image/three.jpeg"
          },
          {
            name: '留恋人间不羡仙',
            "img": "image/one.jpeg"
          },
          {
            name: '只盼流星不盼雨',
            "img": "image/two.jpeg"
          }
        ]
      },
      quickConfig: {
        nav: ['快捷回复', '超级回复'],
        showAdd: true,
        maxlength: 200,
        showHeader: true,
        showDeleteBtn: true,
      },
      talk: [
        '快捷回复1',
        '快捷回复2',
        '快捷回复3',
        '快捷回复4',
        '快捷回复5',
        '快捷回复6',
      ],
      config: {//config是头部属性
        img: '/image/CNN.png',
        name: 'CNN',
        dept: 'Robot for Facebook',
        historyConfig:{
          tip: '加载更多',
          callback: this.bindLoadHistory,
        }
      },
    }
  },
  methods: {
    bindLoadHistory () {
      const history = new Array(3).fill().map((i, j) => {
        return {
          "date": "2020/09/20 23:19:21",
          "text": { "text": j + new Date() },
          "mine": false,
          "name": "CNN",
          "img": "image/CNN.png"
        }
      })
      let list = history.concat(this.list)
      this.list = list
      console.log('加载历史', list, history)
    },
    change () {
      this.num++
    },
    talkEvent (play) {
      console.log(play)
    },
    bindEnter () {
      const msg = this.inputMsg
      if (!msg) return;
      const msgObj = {
        "date": moment(Date.now()).format('yyyy/MM/DD HH:mm:ss'),
        "text": { "text": msg },
        "mine": true,
        "name": "User",
        "img": "image/user.png"
      }
      this.list.push(msgObj)
    },
    toolEvent (type, plyload) {
      console.log('tools', type, plyload)
    },
    bindCover (type) {
      console.log('header', type)
    },
    rightClick (type) {
      console.log('rigth', type)
    },
    bindTalk (play) {
      console.log('talk', play)
    }
  },
  mounted () {
    this.list = [
      {
        "date": "2020/09/12 12:19:12",
        "text": { "text": "Ok，got it. It's been a big good news day. Here are your top story." },
        "mine": false,
        "name": "CNN",
        "img": "/image/CNN.png"
      },
      {
        "date": "2020/09/12 12:20:11",
        "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
        "mine": false,
        "name": "CNN",
        "img": "/image/CNN.png"
      },
      {
        "date": "2020/09/12 13:19:45",
        "text": { "text": "<img data-src='/image/planet.jpg'/>  Ok，got it. It's been a big good news day. Here are your top story."  },
        "mine": false,
        "name": "CNN",
        "img": "/image/CNN.png"
      },
      {
        "date": "2020/09/12 13:39:12",
        "text": { "text": "hello" },
        "mine": true,
        "name": "User",
        "img": "/image/user.png"
      },
    ]
  }
}
</script>
<style scoped>
.rightSlot {
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
}
</style>
<style>
.active {
  color: red;
}
* {
  padding: 0;
  margin: 0;
}
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to bottom right, #fff, #000);
}
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
