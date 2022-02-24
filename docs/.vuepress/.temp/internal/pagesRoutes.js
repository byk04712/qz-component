import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"首页"},["/index.html","/README.md"]],
  ["v-17d5b630","/component/crud.html",{"title":"CRUD 组件介绍"},["/component/crud","/component/crud.md"]],
  ["v-18867885","/directive/modal.html",{"title":"a-modal 组件可拖拽指令"},["/directive/modal","/directive/modal.md"]],
  ["v-7554641c","/feature/",{"title":""},["/feature/index.html","/feature/index.md"]],
  ["v-581fa223","/filter/amount.html",{"title":"amount 金额格式化展示过滤器"},["/filter/amount","/filter/amount.md"]],
  ["v-fb0f0066","/guide/getting-started.html",{"title":"快速上手"},["/guide/getting-started","/guide/getting-started.md"]],
  ["v-fffb8e28","/guide/",{"title":"介绍"},["/guide/index.html","/guide/index.md"]],
  ["v-748575ac","/v3/guide/",{"title":"敬请期待"},["/v3/guide/index.html","/v3/guide/index.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
