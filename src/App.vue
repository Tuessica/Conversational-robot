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
      scrollType="scroll"
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
import {postMessage} from '@/api/chat'

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
      
      config: {//config是头部属性
        img: '/image/title.jpg',
        name: '新闻聊天机器人',
        // dept: 'Robot for Facebook',
        historyConfig:{
          tip: '加载更多',
          callback: this.bindLoadHistory,
        }
      },
    }
  },
  methods: {
    bindLoadHistory () {
      const history = new Array(3).fill().map((j, i) => {
        return {
          "date": `2020/09/20 23:19:2${i}`,
          "text": { "text": j + new Date() },
          "mine": false,
          "name": "newsbot",
          "img": "image/title.jpg"
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

      // 向后端发送输入信息
      const data = new FormData()
      data.set('question', msg)
      postMessage(data)
      .then(res => {
        if (res.data.type === 1) {
          const msgObj = {
            "date": moment(Date.now()).format('yyyy/MM/DD HH:mm:ss'),
            "text": { "text": res.data.text },
            "mine": false,
            "name": "newsbot",
            "img": "image/title.jpg"
          }
          this.list.push(msgObj)
        } else {
          let htmlStr = ''
          res.data.text.forEach(item => {
            htmlStr += `<a href='${item.url}' target="_blank">${item.title}</a> </br><img src='${item.img_path}' width="300" height="200"/><br>`
          });
          // htmlStr += `<img src="${res.data.text[0].img_path}"/>`
          const msgObj = {
            "date": moment(Date.now()).format('yyyy/MM/DD HH:mm:ss'),
            "text": { "text": htmlStr },
            "mine": false,
            "name": "newsbot",
            "img": "image/title.jpg"
          }
          this.list.push(msgObj)
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
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
      // {
      //   "date": "2020/09/12 12:19:12",
      //   "text": { "text": "Ok，got it. It's been a big good news day. Here are your top story." },
      //   "mine": false,
      //   "name": "CNN",
      //   "img": "/image/CNN.png"
      // },
      // {
      //   "date": "2020/09/12 12:20:11",
      //   "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
      //   "mine": false,
      //   "name": "CNN",
      //   "img": "/image/CNN.png"
      // },
      // {
      //   "date": "2020/09/12 13:19:45",
      //   "text": { "text": "<img data-src='/image/planet.jpg'/>  Ok，got it. It's been a big good news day. Here are your top story."  },
      //   "mine": false,
      //   "name": "CNN",
      //   "img": "/image/CNN.png"
      // },
      // {
      //   "date": "2020/09/12 13:39:12",
      //   "text": { "text": "hello" },
      //   "mine": true,
      //   "name": "User",
      //   "img": "/image/user.png"
      // },
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
