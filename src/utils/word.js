// import GUID from 'guid'
// import moment from 'moment'
// import Storage from 'apis/storage'

const host = 'localhost'
const $ = window.$;
//雷老师host
// const host = '172.16.6.180'

const ServerUrl = `http://${host}:12050/`
const ServerUrlCompose = 'http://localhost:12051/'



const script = document.createElement('script')
const readyQueue = []

// word插件是否加载完成标识
let isHubReady = false
let singleton
/**
 * 和word通信的API类
 */
const WordAPI = {
  // 存储类型
  MODE: {
    KNOWLEDGE: 1,
    TEXTBOOK: 0
  },

  // 存储方式
  TYPE: {
    NEW: 1,
    OLD: 0
  },

  isReady: isHubReady,
  // Word服务类型，不通类型会取不通端口的word服务
  SERVER: {
    // 合成试卷服务
    COMPOSE: 'compose',

    // 获取word内容服务
    WORD: 'word'
  },

  // 远端资源路径
  //RESOURCE_URL: Storage.getTopicBucket(),

  // 初始化word插件
  init(server) {
    const prev = document.getElementById("prev")

    if (prev) {
      document.body.removeChild(prev)
    }

    let script = document.createElement('script')
    script.id = 'prev'

    if (server === WordAPI.SERVER.WORD) {
      script.src = `${ServerUrl}signalr/hubs`
      document.body.appendChild(script)
    } else {
      script.src = `${ServerUrlCompose}signalr/hubs`
      document.body.appendChild(script)
    }

    function _ready() {
      isHubReady = true

      if (readyQueue.length > 0) {
        $.connection.hub.start().done(() => {
          while (readyQueue.length > 0) {
            readyQueue.pop()()
          }
        })
      }
    }
    _ready()
    // script.onload = () => {
    //   _ready()
    // }
  },

  /**
   * @done ready成功回调
   * @fail ready失败回调
   * @server ready类型（compose表示合成教材服务器，不传表示正常）
   */
  ready(done, fail, server) {
    try {
      server === WordAPI.SERVER.COMPOSE ?
        $.connection.hub.url = `${ServerUrlCompose}signalr` :
        $.connection.hub.url = `${ServerUrl}signalr`

      if (true) {
        console.log('start')
        singleton = $.connection.hub
        singleton.start().done(console.log)
        singleton.error(function (e) {
          console.log(e)
          fail && fail('signalr连接失败')
          console.log('signalr连接失败')
        });
      } else {
        singleton.start().done(console.log)
      }
      // 重连signalr服务
      // $.connection.hub.disconnected(function () {
      //   setTimeout(function () {
      //     $.connection.hub.start().done(done);
      //   }, 1000);
      // });
    } catch (e) {
      //fail(e)
      console.log(e)
    }
  },
  // 获取signalr服务
  getChatServer() {
    return $.connection.myHub.server
  },

  /**
   * 将内容发送给Word
   * @param type 1 老文件 0 新建
   * @param mode 1 题库 0 教材
   */
  sendToWord(uri, type, mode, html) {
    // const topicBucket = Storage.getTopicBucket()
    // const diyBucket = Storage.getDiyBucket()

    // uri = uri.replace(topicBucket, '')
    // uri = uri.replace(diyBucket, '')

    // if(uri.indexOf('/') === 0) {
    //   uri = uri.substr(1)
    // }
    if (uri.substr(uri.length - 1) === '/') {
      uri = uri.substr(0, uri.length - 1)
    }
    const _uriarr = uri.split('/')
    if (_uriarr[_uriarr.length - 1].indexOf(".docx") > -1) {
      this.getChatServer()
        .openWord(type || 1,
          mode === 1 ? Storage.getTopicBucket() : Storage.getDiyBucket(),
          _uriarr[_uriarr.length - 4], _uriarr[_uriarr.length - 3], _uriarr[_uriarr.length - 2], html
        );
    } else {
      if (_uriarr.length === 1) {
        console.log('www')
        this.getChatServer()
          .openWord(type || 1,
            mode === 1 ? Storage.getTopicBucket() : Storage.getDiyBucket(),
            '', '', '', html
          );
      } else {
        this.getChatServer()
          .openWord(type || 1,
            mode === 1 ? Storage.getTopicBucket() : Storage.getDiyBucket(),
            _uriarr[_uriarr.length - 3], _uriarr[_uriarr.length - 2], _uriarr[_uriarr.length - 1], html
          );
      }

    }
  },

  /**
   * 合成教材
   */
  composeTextbook(book) {
    this.getChatServer()
      .makeBooks(JSON.stringify(book))
      .done(function () {
        // alert("教材合成开始！过程中请勿在word可编辑区域点击鼠标操作！")
      }).fail(function (error) {
        console.log(error)
      })
  },

  /**
   * 获取word中的内容
   * @param dom 获取后需要渲染的dom
   * @param type 1 老文件 0 新建
   * @param mode 1 题库 0 教材
   * @param dir 部件id 放入的目录标识
   * @param uri 修改时传入的默认uri值
   *
   * @return Promise对象
   */
  requestWord(dom, mode, type, dir, uri) {
    return new Promise((res, rej) => {
      // 每次获取都生成一个新的guid和time
      let _guid = '123'; // GUID.create().value.replace(/-/g, '')
      console.log('dir', dir)
      let _time = 'time123'; // dir + moment(new Date()).format('YYYYMMDD')

      let _saveWord = this.getChatServer()
        //.saveWord(type, mode, '\\\\.\\pipe\\tiku_123', _time, _guid, dir, "YmFzZTY05Y+C5pWw,")
        .saveWord(type, mode, mode === 1 ? 'topic' : 'piece', _time, _guid, dir, "YmFzZTY05Y+C5pWw,")

      _saveWord.done((result) => {
        if (!result) {
          rej({
            data: 'word中未选中任何内容，请选择！！'
          })
        } else {
          result = JSON.parse(result)
          // document.getElementById(dom).innerHTML = result.data
          // this.MathJaxReset(dom)
          if (result.msgName === 'error') {
            return rej(result)
          }
          res({
            uid: `${_time}/${_guid}/${dir}`,
            text: result.text,
            html: result.data
          })
        }
      }).fail(err => {
        rej(err)
      })
    })
  },

  /**
   * 通过uid得到远端word资源
   * @param uid word资源id
   * @param html 是否获取html链接
   * @param mode 1 题库 0 教材
   */
  getUrlByUid(uid, html, mode) {
    let wordtype = uid.substr(uid.lastIndexOf('/') + 1);

    const RESOURCE_URL = mode === 1 ? Storage.getTopicBucket() : Storage.getDiyBucket()

    return html ?
      `${RESOURCE_URL}${uid}/${wordtype}.html` :
      `${RESOURCE_URL}${uid}/${wordtype}.body`
  },

  /**
   * 通过uid得到远端word资源
   * @param uid word资源id
   * @param done 完成回调
   */
  getResourceByUid(uid, mode, done, html = 0) {
    if (!uid) {
      return false
    }

    $.get(this.getUrlByUid(uid, html, mode)).then(done)
  },

  /**
   * 重新渲染mathjax
   */
  MathJaxReset(dom) {
    // 避免一步渲染
    // if (typeof MathJax != 'undefined') {
    //   MathJax.Hub.Queue(["Typeset", MathJax.Hub, dom])
    // } else {
    //   setTimeout(() => {
    //     if (typeof MathJax != 'undefined') {
    //       MathJax.Hub.Queue(["Typeset", MathJax.Hub, dom])
    //     }
    //   }, 0)
    // }


  },
  /**
   * 自动刷新页面Jax
   */
  reloadMathJax() {
    // MathJax.Hub.Queue(["Typeset", MathJax.Hub])
  }
}


export default WordAPI
