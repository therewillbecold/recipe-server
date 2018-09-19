var http = require('http')
const port = 2345

http
  .createServer((req, res) => {
    res.end(`[
      {
        species: 'bird',
        color: 'black',
        food: 'worm'
      },
      {
        species: 'cat',
        color: 'orange',
        food: 'fish'
      },
      {
        species: 'dog',
        color: 'brown',
        food: 'pork'
      }
    ]`),
      'utf-8',
      () => {
        console.log('数据已返回')
      }
  })
  .listen(port, () => {
    console.log(`服务已启动,监听${port}`)
  })
