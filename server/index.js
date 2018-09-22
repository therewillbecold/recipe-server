import Koa from 'koa'
import Router from 'koa-router'
import staticServer from 'koa-static'
import fs from 'fs'
import path from 'path'
import cors from '@koa/cors'

const app = new Koa()
const router = new Router()
const port = 60000

// app.use(async (ctx, next) => {
//   ctx.body = {
//     status: 0,
//     data: [
//       {
//         species: 'bird',
//         color: 'black',
//         food: 'worm'
//       },
//       {
//         species: 'cat',
//         color: 'orange',
//         food: 'fish'
//       },
//       {
//         species: 'dog',
//         color: 'brown',
//         food: 'pork'
//       }
//     ]
//   }
// })

app.use(cors())

/*接口*/
// 根据种类获取菜谱
router.get('/api/recipe/:categoryId', async ctx => {
  console.log(ctx.params)
  const categoryId = ctx.params.categoryId
  const recipe = require('./recipe-data/recipe.json')
  ctx.body = {
    status: 0,
    data: recipe[categoryId] || [],
    massage: 'success'
  }
})
// 获取所有的菜单种类
router.get('/api/categories', async ctx => {
  ctx.body = {
    status: 0,
    data: require('./recipe-data/categories.json'),
    message: 'success'
  }
})
/**
 *  获取菜单详情
 * 支持的参数
 * recipeId: 菜谱的id
 * keyword: 菜单搜索关键词
 */
let allRecipes = []
let _recipeData = require('./recipe-data/recipe.json')
Object.values(_recipeData).forEach((arr) => {
  allRecipes = allRecipes.concat(arr)
})

router.get('/api/detail', async ctx => {
  console.log(ctx.query);
  const { recipeId, keyword } = ctx.query
  let responseData = []
  if (recipeId) {
    responseData = [allRecipes.find(item => item.id === recipeId)]
  } else if (typeof keyword !== 'undefined') {
    responseData = allRecipes.filter(item => {
      return item.title.includes(keyword) || item.tags.includes(keyword)
    })
  }

  console.log(responseData);

  ctx.body = {
    status: 0,
    data: responseData,
    message: 'success'
  }
})

router.get('/animal', async (ctx, next) => {
  ctx.body = {
    status: 0,
    data: [
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
    ]
  }
})

router.post('/animal', async ctx => {
  ctx.body = {
    status: 0,
    data: [
      {
        species: 'snake',
        color: 'black',
        food: 'rat'
      },
      {
        species: 'shark',
        color: 'blue',
        food: 'fish'
      },
      {
        species: 'whale',
        color: 'blue',
        food: 'fish'
      }
    ]
  }
})

// function readFile(fileDir) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(
//       path.resolve(__dirname, fileDir),
//       { encoding: 'utf-8' },
//       (err, data) => {
//         if (err) reject(err)
//         resolve(data)
//       }
//     )
//   })
// }

/*修改访问路径地址*/
router.get('/sec', async ctx => {
  ctx.redirect('/sec.html')
})

app.use(staticServer(path.resolve(__dirname, './static')))
app.use(router.routes())
app.listen(port, () => {
  console.log(`服务已启动,监听${port}`)
})
