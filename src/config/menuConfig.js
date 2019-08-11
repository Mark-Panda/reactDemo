const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'pie-chart'
    },
    {
        title: '商品',
        key: '/product',
        icon: 'appstore',
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: 'bars'
            },
            {
                title: '商品管理',
                key: '/product',
                icon: 'tool'
            }
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'mail'
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'mail'
    },
    {
        title: '图形分析',
        key: '/charts',
        icon: 'tool',
        children: [
            {
                title: '柱状图',
                key: '/charts/bar',
                icon: 'tool'
            },
            {
                title: '条形图',
                key: '/charts/line',
                icon: 'tool'
            },
            {
                title: '饼状图',
                key: '/charts/pie',
                icon: 'tool'
            },
        ]
    },
]

export default menuList