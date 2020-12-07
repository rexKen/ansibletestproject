'use strict';
const fs = require('fs');
const path = require('path');

class ResourceListWebpackPlugin {
  constructor (options) {
    this.options = Object.assign({}, {
      name: ''
    }, options);
  }
  createModulejs (htmlPluginData, callback) {
    // console.log(htmlPluginData);
    // console.log(this);
    const head = htmlPluginData.head;
    const body = htmlPluginData.body;
    // console.log(head);
    // console.log(body);
    const js = [];
    const css = [];
    for (let i = 0; i < head.length; i++) {
      css.push(head[i].attributes.href);
    }
    for (let i = 0; i < body.length; i++) {
      js.push(body[i].attributes.src);
    }
    const obj = {
      css,
      js
    }
    const name = this.options.name;
    let fileString = 'window["' + name + '"] = ' + JSON.stringify(obj);
    // 创建dist文件夹
    fs.mkdirSync(path.resolve(__dirname, '../dist'));
    const result = fs.writeFileSync(path.resolve(__dirname, `../dist/module.${new Date().getTime()}.js`), fileString);
    if (result) {
      console.log('文件写入失败');
      console.log(result);
    }
    callback()
  }
  apply (compiler) {
    // Hook into the html-webpack-plugin processing
    if (compiler.hooks) {
      // Webpack 4+ Plugin System
      compiler.hooks.compilation.tap('ResourceListWebpackPlugin', compilation => {
        if (compilation.hooks.htmlWebpackPluginAlterAssetTags) {
          compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('ResourceListWebpackPluginAlterAssetTags', (htmlPluginData, callback) => {
            try {
              this.createModulejs(htmlPluginData, callback)
            } catch (error) {
              callback(error);
            }
          });
        }
      });
    } else {
      // Webpack 1-3 Plugin System
      compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, callback) => {
          try {
            this.createModulejs(htmlPluginData, callback)
          } catch (error) {
            callback(error);
          }
        });
      });
    }
  }
}



module.exports = ResourceListWebpackPlugin;
