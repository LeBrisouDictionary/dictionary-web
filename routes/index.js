module.exports = [
  {
    path: "/css/{path*}",
    method: "GET",
    handler: {
      directory: {
        path: process.env.dictionary_web_base_dir + "/public/assets/css",
        listing: false,
        index: false
      }
    }
  },

  {
    path: "/js/{path*}",
    method: "GET",
    handler: {
      directory: {
        path: process.env.dictionary_web_base_dir + '/public/js/',
        listing: false,
        index: false
      }
    }
  },
  {
    path: "/{path*}",
    method: "GET",
    handler: {
      directory: {
        path: process.env.dictionary_web_base_dir + "/public/views",
        listing: false,
        index: true
      }
    }
}
]
