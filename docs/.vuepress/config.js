module.exports = {
  chainWebpack (config) {
    config.module
      .rule('typescript')
      .exclude
        .add(/node_modules/)
        .end()
      .test(/\.tsx?$/)
      .use('ts-loader')
        .loader('ts-loader')
        .options({
          appendTsSuffixTo: [/\.vue$/],
        })
        .end()
  },
  title: 'DataTable',
  dest: './dist/docs',
  base: '/docs/',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }]
  ],
  themeConfig: {
    repo: 'dpineda64/data-table',
    sidebar: [
      ['/install/', 'Project Install'],
      {
        title: 'DataTable',
        collapsable:false,
        children: [
          '/DataTable/',
          '/DataTable/slots'
        ],
      },
      {
        title: 'DataTableHeader',
        collapsable:false,
        children: [
          '/DataTableHeader/',
        ],
      },
      {
        title: 'DataTableBody',
        collapsable:false,
        children: [
          '/DataTableBody/',
        ],
      },
      {
        title: 'DataTablePagination',
        collapsable:false,
        children: [
          '/DataTablePagination/',
        ],
      },
    ],
  },
  plugins:[
    ['@vuepress/back-to-top', true]
  ]
};
