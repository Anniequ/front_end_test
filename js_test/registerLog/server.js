var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]
var md5 = require('md5')
if (!port) {
  console.log('请指定端口号好不啦？\n node server.js 8888 这样不会吗？')
  process.exit(1)
}
let sessions = {

}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var path = request.url
  var query = ''
  if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('HTTP 路径为\n' + path)

  if (path === '/js/main.js') {
    let string = fs.readFileSync('./js/main.js', 'utf-8')
    response.setHeader('Content-Type', 'application/javascript;charset=utf8')    
    //response.setHeader('Cache-Control','max-age=30')  //保留30秒，30秒内你刷新浏览器就从内存里加载   优化
    //response.setHeader('Expires','Wed, 21 Oct 2021 07:28:00 GMT') //保留到这个时候，期间内你刷新浏览器就从内存里加载   优化
    let fileMd5 = md5(string)
    
    if (request.headers['if-none-match'] === fileMd5) {
      //console.log(1)
      response.statusCode = 304  //不用响应体    优化
    }else {
      response.statusCode = 200
      response.setHeader('Etag', fileMd5)
      response.write(string)
    }
    response.end()
  } else if (path == '/css/default.css') {
    let string = fs.readFileSync('./css/default.css', 'utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf8')
    response.write(string)
    response.end()
  }
  else if (path == '/') {
    let string = fs.readFileSync('./index.html', 'utf-8')
    var users = fs.readFileSync('./db/users.json', 'utf8')
    try {
      users = JSON.parse(users)
    } catch (exception) {
      users = []
    }
    let cookies = ''
    if (request.headers.cookie) {
      cookies = request.headers.cookie.split('; ')
    }

    let hash = {}
    cookies.forEach((e) => {
      let parts = e.split('=')
      let key = parts[0]
      let value = parts[1]
      hash[key] = value
    })
    // console.log(hash.sessionId)
    let mySession = sessions[hash.sessionId]
    let email
    if (mySession) {
      email = mySession.sign_in_email
    }
    let foundUser
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        foundUser = users[i]
        break
      }
    }
    if (foundUser) {
      string = string.replace('__password__', foundUser.psd)
    } else {
      string = string.replace('__password__', '不知道')
    }
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'GET') {
    let string = fs.readFileSync('./sign_up.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'POST') {
    readBody(request).then((body) => {
      let strings = body.split('&')
      let hash = {}
      strings.forEach((string) => {
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let { email, psd, psd_conf } = hash
      if (email.indexOf('@') === -1) {
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.write(`
        {"errors":{
          "email": "invalid"
        }}
        `)
      } else if (psd !== psd_conf) {
        response.statusCode = 400
        response.write('password is not match')
      } else {
        var users = fs.readFileSync('./db/users.json', 'utf8')
        try {
          users = JSON.parse(users)
        } catch (exception) {
          users = []
        }
        let inUse = false
        for (let i = 0; i < users.length; i++) {
          let user = users[i]
          if (user.email === email) {
            inUse = true
            break
          }
        }
        if (inUse) {
          response.statusCode = 400
          response.write('email in use')
        } else {
          users.push({ email: email, psd: psd })
          fs.writeFileSync('./db/users.json', JSON.stringify(users))
          response.statusCode = 200
        }

      }
      response.end()
    })

  } else if (path === '/sign_in' && method === 'GET') {
    let string = fs.readFileSync('./sign_in.html', 'utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_in' && method === 'POST') {
    readBody(request).then((body) => {
      let strings = body.split('&')
      let hash = {}
      strings.forEach((string) => {
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let { email, psd } = hash
      var users = fs.readFileSync('./db/users.json', 'utf8')
      try {
        users = JSON.parse(users)
      } catch (exception) {
        users = []
      }
      let found = false
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].psd === psd) {
          found = true
          break
        }
      }
      if (found) {
        let sessionId = Math.random() * 100000
        sessions[sessionId] = { sign_in_email: email }
        response.setHeader('Set-Cookie', `sessionId=${sessionId}`)
        response.statusCode = 200
      } else {
        response.statusCode = 401
      }
      response.end()
    })
  } else if (path == '/main.js') {
    let string = fs.readFileSync('./main.js', 'utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write(string)
    response.end()
  } else if (path == '/xxx') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json; charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', "*")
    response.write(`{
      "note":{
        "to":"小明",
        "from":"小红",
        "heading":"打招呼",
        "content":"hi"
      }
    }`)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})
function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = [] //请求体
    request.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      resolve(body)
    })
  })
}
server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

