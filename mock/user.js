const Mock = require('mockjs')
const List = []
const count = 100
const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    userId: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    userName: '@first',
    userPhone: /^1(5|3|7|8)[0-9]{9}$/,
    userAddress: '@county(true)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
const data = Mock.mock({
  'items|30': [{
    'userId|+1': 1,
    userName: '@name',
    'status|1': ['published', 'draft', 'deleted'],
    userPhone: /^1(5|3|7|8)[0-9]{9}$/,
    userAddress: '@county(true)',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})
module.exports = [
  // user login
  {
    url: '/czs-web/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/czs-web/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/czs-web/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/dashboard',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          user: {
            login_name: 'admin',
            user_id: 1,
            user_name: '管理员',
            dept_id: 1
          },
          menuList: [
            {
              parent_id: 0,
              menu_name: '基本信息管理',
              icon: 'system',
              perms: null,
              order_num: 2,
              menu_id: 10,
              url: '#',
              create_time: '2018-03-16 11:33:00',
              menu_type: 'M',
              children: [
                {
                  create_time: '2018-03-16 11:33:00',
                  menu_type: 'C',
                  children: [],
                  parent_id: 10,
                  menu_name: '用户管理',
                  icon: 'system-user',
                  perms: 'system:user:index',
                  order_num: 1,
                  menu_id: 11,
                  url: '/system/user/listUser'
                }, {
                  create_time: '2018-12-28 10:36:20',
                  menu_type: 'M',
                  parent_id: 10,
                  menu_name: '角色管理',
                  icon: 'system-role',
                  perms: null,
                  order_num: 2,
                  menu_id: 12,
                  url: '#'
                }, {
                  create_time: '2018-12-28 10:36:20',
                  menu_type: 'M',
                  parent_id: 10,
                  menu_name: '权限管理',
                  icon: 'system-permission',
                  perms: null,
                  order_num: 3,
                  menu_id: 13,
                  url: '#'
                }, {
                  menu_id: 14,
                  create_time: '2018-12-28 10:36:20',
                  menu_type: 'M',
                  parent_id: 10,
                  menu_name: '菜单管理',
                  icon: 'system-menu',
                  perms: null,
                  order_num: 4,
                  url: '#',
                  children: [{
                    menu_id: 140,
                    create_time: '2018-12-28 10:36:20',
                    menu_type: 'M',
                    parent_id: 14,
                    menu_name: '菜单基础信息',
                    icon: 'fa fa-address-book-o',
                    perms: null,
                    order_num: 5,
                    url: '#'
                  }, {
                    menu_id: 141,
                    create_time: '2018-12-28 10:36:20',
                    menu_type: 'M',
                    parent_id: 14,
                    menu_name: '菜单角色配置',
                    icon: 'fa fa-address-book-o',
                    perms: null,
                    order_num: 5,
                    url: '#'
                  }]
                }
              ]
            }, {
              parent_id: 0,
              menu_name: '系统监控统计',
              icon: 'statis',
              perms: null,
              order_num: 5,
              menu_id: 20,
              url: '#',
              create_time: '2018-03-16 11:33:00',
              menu_type: 'M',
              children: [
                {
                  create_time: '2018-03-16 11:33:00',
                  menu_type: 'C',
                  parent_id: 2,
                  menu_name: '数据监控',
                  icon: '#',
                  perms: 'monitor:data:view',
                  order_num: 3,
                  menu_id: 15,
                  url: '/system/druid/monitor'
                }
              ]
            }
          ]
        }
      }
    }

  },
  {
    url: '/czs-web/user/listUser',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/czs-web/user/fetchList',
    type: 'get',
    response: config => {
      const { importance, type, userName, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (userName && item.userName.indexOf(userName) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
