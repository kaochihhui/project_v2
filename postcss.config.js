// console.log(path.join(, 'mixins'));
var initial_path = "../../../../";
module.exports = {
  plugins: [
    require("postcss-strip-inline-comments"),
    require('postcss-smart-import'),
    require("postcss-sassy-mixins"),
    require("postcss-media-minmax"),
    require('precss'),
    require('autoprefixer'),
    require("postcss-utilities"),
    require("lost"),
    require("postcss-font-magician")({
      custom: {
        "Glyphicons Halflings": {
          variants: {
            normal: {
              100: {
                url: {
                  eot: initial_path + "fonts/bootstrap-3.3/glyphicons-halflings-regular.eot",
                  ttf: initial_path + "fonts/bootstrap-3.3/glyphicons-halflings-regular.ttf",
                  woff: initial_path + "fonts/bootstrap-3.3/glyphicons-halflings-regular.woff",
                  woff2: initial_path + "fonts/bootstrap-3.3/glyphicons-halflings-regular.woff2",
                  svg: initial_path + "fonts/bootstrap-3.3/glyphicons-halflings-regular.svg"
                }
              }
            }
          }
        },
        "FontAwesome": {
          variants: {
            normal: {
              100: {
                url: {
                  eot: initial_path + "fonts/font-awesome-4.7.0/fontawesome-webfont.eot",
                  ttf: initial_path + "fonts/font-awesome-4.7.0/fontawesome-webfont.ttf",
                  woff: initial_path + "fonts/font-awesome-4.7.0/fontawesome-webfont.woff",
                  woff2: initial_path + "fonts/font-awesome-4.7.0/fontawesome-webfont.woff2",
                  svg: initial_path + "fonts/font-awesome-4.7.0/fontawesome-webfont.svg"
                }
              }
            }
          }
        },
        "SelaneMinTen": {
          variants: {
            normal: {
              900: {
                url: {
                  eot: initial_path + "fonts/SelaneWebSTMinTen.eot",
                  ttf: initial_path + "fonts/SelaneWebSTMinTen.ttf",
                  woff: initial_path + "fonts/SelaneWebSTMinTen.woff"
                }
              }
            }
          }
        },
        "SelaneThirty": {
          variants: {
            normal: {
              300: {
                url: {
                  eot: initial_path + "fonts/SelaneWebSTThirty.eot",
                  ttf: initial_path + "fonts/SelaneWebSTThirty.ttf",
                  woff: initial_path + "fonts/SelaneWebSTThirty.woff",
                  svg: initial_path + "fonts/SelaneWebSTThirty.svg"
                }
              }
            }
          }
        },
        "SelaneTen": {
          variants: {
            normal: {
              900: {
                url: {
                  eot: initial_path + "fonts/selanedeckst_ten-webfont.eot",
                  ttf: initial_path + "fonts/selanedeckst_ten-webfont.ttf",
                  woff: initial_path + "fonts/selanedeckst_ten-webfont.woff",
                  svg: initial_path + "fonts/selanedeckst_ten-webfont.svg"
                }
              }
            }
          }
        },
        "CuratorRegular": {
          variants: {
            normal: {
              400: {
                url: {
                  eot: initial_path + "fonts/curator_head_st_regular-webfont.eot",
                  ttf: initial_path + "fonts/curator_head_st_regular-webfont.ttf",
                  woff: initial_path + "fonts/curator_head_st_regular-webfont.woff",
                  svg: initial_path + "fonts/curator_head_st_regular-webfont.svg"
                }
              }
            }
          }
        },
        "CuratorBold": {
          variants: {
            normal: {
              700: {
                url: {
                  eot: initial_path + "fonts/curator_head_st_bold-webfont.eot",
                  ttf: initial_path + "fonts/curator_head_st_bold-webfont.ttf",
                  woff2: initial_path + "fonts/curator_head_st_bold-webfont.woff2",
                  woff: initial_path + "fonts/curator_head_st_bold-webfont.woff",
                  svg: initial_path + "fonts/curator_head_st_bold-webfont.svg"
                }
              }
            }
          }
        },
        "Source Sans Pro": {
          variants: {
            normal: {
              300: {
                url: {
                  eot: initial_path + "fonts/curator_head_st_regular-webfont.eot",
                  ttf: initial_path + "fonts/curator_head_st_regular-webfont.ttf",
                  woff: initial_path + "fonts/curator_head_st_regular-webfont.woff",
                  svg: initial_path + "fonts/curator_head_st_regular-webfont.svg"
                }
              },
              400: {
                url: {
                  eot: initial_path + "fonts/curator_head_st_regular-webfont.eot",
                  ttf: initial_path + "fonts/curator_head_st_regular-webfont.ttf",
                  woff: initial_path + "fonts/curator_head_st_regular-webfont.woff",
                  svg: initial_path + "fonts/curator_head_st_regular-webfont.svg"
                }
              },
              600: {
                url: {
                  eot: initial_path + "fonts/curator_head_st_bold-webfont.eot",
                  ttf: initial_path + "fonts/curator_head_st_bold-webfont.ttf",
                  woff2: initial_path + "fonts/curator_head_st_bold-webfont.woff2",
                  woff: initial_path + "fonts/curator_head_st_bold-webfont.woff",
                  svg: initial_path + "fonts/curator_head_st_bold-webfont.svg"
                }
              },
              700: {
                url: {
                  eot: initial_path + "fonts/curator_head_st_bold-webfont.eot",
                  ttf: initial_path + "fonts/curator_head_st_bold-webfont.ttf",
                  woff2: initial_path + "fonts/curator_head_st_bold-webfont.woff2",
                  woff: initial_path + "fonts/curator_head_st_bold-webfont.woff",
                  svg: initial_path + "fonts/curator_head_st_bold-webfont.svg"
                }
              }
            },
            italic: {
              400: {
                url: {
                  eot: initial_path + "fonts/curator_head_st_regular-webfont.eot",
                  ttf: initial_path + "fonts/curator_head_st_regular-webfont.ttf",
                  woff: initial_path + "fonts/curator_head_st_regular-webfont.woff",
                  svg: initial_path + "fonts/curator_head_st_regular-webfont.svg"
                }
              }
            }
          }
        }
      }
    })
  ]
}
