import { parse } from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);




export const Util =   {
  formateDate(time){
    if(!time)return '';
    let date = new Date(time);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  },

  pagination(data,callback,params){
    return {
      onChange:(current,pageSize)=>{
        callback(current,pageSize)
      },
      current:params.currentPage,
      pageSize:data.pageSize,
      total: data.total,
      showTotal:()=>{
        return `共${data.total}条`
      },
      showQuickJumper:true,
      defaultCurrent:1,
    }
  },

  unEscapeAnd: function (content) {
    if (!content) return '';
    var reg = /&/;
    if (reg.test(content)) {
      content = content.replace(/&/g, '&');
    }
    return content;
  },
  /**
   * html反转义
   * @param str
   * @returns {*}
   */
  unEscape: function (input) {
    if (!input) return '';
    input = Util.unEscapeAnd(input);
    var el = document.createElement('div');
    el.innerHTML = input;
    return el.childNodes[0].textContent;
  },
  decodeHtml: function (s) {
    var HTML_DECODE = {
      "<": "<",
      ">": ">",
      "&": "&",
      "&nbsp;": " ",
      "&quot;": "\"",
      "&middot;":"·",
      "": ""
    };
    var REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
    s = (s != undefined) ? s : this.toString();
    return (typeof s != "string") ? s :
      s.replace(REGX_HTML_DECODE,
        function ($0, $1) {
          var c = HTML_DECODE[$0];
          if (c == undefined) {
            // Maybe is Entity Number
            if (!isNaN($1)) {
              c = String.fromCharCode(($1 == 160) ? 32 : $1);
            } else {
              c = $0;
            }
          }
          return c;
        });
  },
  uniqueList: function (list) {
    let res = [];
    let map = {};
    if (list && list.length > 0) {
      list.map((item) => {
        if (!map[item]) {
          res.push(item);
          if (typeof(item) == 'object') {
            map[item.get('origin')._origin.sentence_id] = 1;
          } else {
            map[item] = 1;
          }
        }
      })
    }
    return res;
  },
  removedObj: function (list, obj) {
    let res = [];
    if (list && list.length > 0) {
      list.map((item) => {
        if (item != obj) {
          res.push(item);
        }
      })
    }
    return res;
  },
  unescapeHtml: function(str) {
    return str ? str.replace(/>/g, '>').replace(/</g, '<') : '';
  },//从cookies中获取ctoken
  getCTokenFromCookies : function() {
    var key = 'ctoken';
    var m = new RegExp('\\b' + key + '\\=([^;]+)').exec(document.cookie);
    return m ? m[1] : '';
  },
  buildImage : function(content,url,type,title,material) {
    const posterUrl=material&& material.posterUrl
    const cycle=material&& material.cycle
    if (type=="image"){

      var img="<div style='display:flex;align-items:center;justify-content:center'> <img src='"+url+"'   controls alt='无法显示'  height='audo' width='100%'></img></div>"

    }else if (type=="audio"&& posterUrl && cycle){

      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+title+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <img src='"+posterUrl+"'  height='250' width='250'></img></div><div style='display:flex;align-items:center;justify-content:center'> <audio src='"+url+"' loop='loop' controls height='35' width='250'></audio></div>"
    }else if (type=="audio"&& !posterUrl && cycle){

      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+title+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <img src='"+"https://articel.oss-cn-hangzhou.aliyuncs.com/ 2019-09-11 1568133332093/timg.jpg"+"'  height='250' width='250'></img></div><div style='display:flex;align-items:center;justify-content:center'> <audio src='"+url+"' loop='loop' controls height='35' width='250'></audio></div>"
    }else if (type=="audio"&& posterUrl && !cycle){
      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+title+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <img src='"+posterUrl+"'  height='250' width='250'></img></div><div style='display:flex;align-items:center;justify-content:center'> <audio src='"+url+"'  controls height='35' width='250'></audio></div>"
    }else if (type=="audio"&& !posterUrl && !cycle){
      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+title+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <img src='"+"https://articel.oss-cn-hangzhou.aliyuncs.com/ 2019-09-11 1568133332093/timg.jpg"+"'  height='250' width='250'></img></div><div style='display:flex;align-items:center;justify-content:center'> <audio src='"+url+"'  controls height='35' width='250'></audio></div>"
    }else if (type=="video"&& posterUrl&& cycle){
      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+title+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <video style='object-fit: fill;'   src='"+url+"'   poster='"+posterUrl+"' loop='loop'  controls   height='"+material.height+"' width='"+material.width+"'>456</video></div>"

    }else if (type=="video"&& posterUrl&& !cycle){
      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+title+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <video style='object-fit: fill;'   src='"+url+"'   poster='"+posterUrl+"'  controls   height='"+material.height+"' width='"+material.width+"'>456</video></div>"

    }else if (type=="video"&& !posterUrl&& cycle){

      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+title+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <video  loop src='"+url+"'   controls loop='loop' height='"+material.height+"' width='"+material.width+"'>123</video></div>"

    }else if (type=="video"&& !posterUrl&& !cycle){

      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+title+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <video  loop src='"+url+"'   controls  height='"+material.height+"' width='"+material.width+"'>123</video></div>"

    }else if (type=="article"){

      var img="<image alt='无法显示' width='80' height=80 src='"+url  +"'/>"
    }else {
      img=content
    }
    return img;
  },

  buildImageUnControls : function(content,url,type,title,posterUrl) {
    const minTitle=title && title.length>10?title && title.substring(0, 10)+"...":title
    if (type=="image"){
      console.log(title && title.substring(0, 5) )
      console.log(url)
      var img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+minTitle+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <img src='"+url+"'   controls alt='无法显示'  height='audo' width='100%'></img></div>"

    }else if (type=="audio"&& !posterUrl){

      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+minTitle+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <audio controls src='"+url+"'    height='35' width='250'></audio></div>"
    }else if (type=="audio" && posterUrl){

      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+minTitle+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <audio controls src='"+url+"'    height='35' width='250'></audio></div>"
    }else if (type=="video" && !posterUrl) {

      img = "<h2 style='text-align:center;'><span style='font-family: KaiTi;'>" + minTitle + "</span></h2><div style='display:flex;align-items:center;justify-content:center'> <video src='" + url + "'    height='auto' width='300'>122</video></div>"
    }else if  (type=="video" && posterUrl){
      img="<h2 style='text-align:center;'><span style='font-family: KaiTi;'>"+minTitle+"</span></h2><div style='display:flex;align-items:center;justify-content:center'> <video style='object-fit: fill;'   src='"+url+"'   poster='"+posterUrl+"'   height='auto' width='300'>122</video></div>"

    }else {

      img=content
    }
    return img;
  }

}

// module.exports = Util;
