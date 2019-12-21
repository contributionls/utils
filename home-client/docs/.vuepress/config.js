module.exports = {
  title: "Utils.men",
  description: "offer some useful tools",
  dest: "build",
  themeConfig: {
    lastUpdated: "Last Updated", // string | boolean
    repo: "contributionls/utils",
    docsDir: "home-client/docs",
    editLinks: true,
    nav: [{ text: "Home", link: "/" }],
    sidebar: ["/", "/merge", "/convert", "/jsonpath", "/template"]
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-144863614-3' // UA-00000000-0
      }
    ]
  ]
};
