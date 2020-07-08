const {query} = require('./mysql');
const {getQueryString} = require('./lib/query');
const moment = require('moment');

const mysqlTable = "blog";

// id，title，keywords，desc，thumbnail，content

const add = async (ctx) => {
  const data = ctx.request.body;
  const sql = 'INSERT INTO '+mysqlTable+' SET ?';
  const args = data;
  const res = await query(sql, args);
  return res;
}

const findById = async (ctx) => {
  const id = getQueryString(ctx.request, 'id');
  const sql = 'SELECT * FROM '+mysqlTable+' WHERE `id` = ?';
  const args = [id];
  const res = await query(sql, args);
  return res;
}

const findByPage = async (ctx) => {
  const title = getQueryString(ctx.request, 'title');
  const keywords = getQueryString(ctx.request, 'keywords');
  const desc = getQueryString(ctx.request, 'desc');
  const content = getQueryString(ctx.request, 'content');
  const pageNum = getQueryString(ctx.request, 'pageNum');
  const pageSize = getQueryString(ctx.request, 'pageSize');
  let queryDataStr = '';
  queryDataStr += queryDataStr + ' title like "%'+title+'%"';
  queryDataStr += queryDataStr + ' or';
  queryDataStr += queryDataStr + ' keywords like "%'+keywords+'%"';
  queryDataStr += queryDataStr + ' or';
  queryDataStr += queryDataStr + ' desc like "%'+desc+'%"';
  queryDataStr += queryDataStr + ' or';
  queryDataStr += queryDataStr + ' content like "%'+content+'%"';
  let pageQueryStr = ' limit '+pageNum+','+pageSize+';'
  const sql = 'SELECT * FROM '+mysqlTable+' WHERE'+queryDataStr+pageQueryStr;
  const args = [];
  const res = await query(sql, args);
  if(res.success){
    res.result.map((item) => {
      item.createTime = moment(item.createTime).format('YYYY/MM/DD HH:mm');
      item.updateTime = moment(item.updateTime).format('YYYY/MM/DD HH:mm');
    })
  }
  return res;
}

module.exports = {
  add,
  findByPage,
  findById
}