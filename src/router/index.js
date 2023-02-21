import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "主页", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "eventsearch",
        name: "eventsearch",
        component: () => import("@/views/eventsearch"),
        meta: { title: "事件查询", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "escalation",
        name: "Escalation",
        component: () => import("@/views/Escalation"),
        meta: { title: "事件上报", icon: "lixiao" },
      },
    ],
  },
  {
    path: "/noHandled",
    component: Layout,
    meta: { title: "我的待办", icon: "gerenxinxi" },
    children: [
      {
        path: "/noHandled",
        name: "noHandled",
        component: () => import("@/views/noHandled"),
        meta: { title: "待处理", icon: "" },
      },
      {
        path: "/handling",
        name: "handling",
        component: () => import("@/views/noHandled/handling"),
        meta: { title: "处理中", icon: "" },
      },
      {
        path: "/finished",
        name: "finished",
        component: () => import("@/views/noHandled/finished"),
        meta: { title: "已完成", icon: "" },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "users",
        name: "users",
        component: () => import("@/views/users"),
        meta: { title: "权限管理", icon: "yonghu" },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "information",
        name: "information",
        component: () => import("@/views/information"),
        meta: { title: "通知管理", icon: "tongzhi" },
      },
    ],
  },
  
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
