// 导入axios
import axios from 'axios'
import router from '../router/router';



// 创建一个副本 设置基地址
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})


// // 添加请求拦截器
http.interceptors.request.use(function (config) {
  
  // 在发送请求之前做些什么
  config.headers.Authorization = window.localStorage.getItem('token')
  
  return config;

}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// // 添加响应拦截器
http.interceptors.response.use(function (response) {

  // 对响应数据做点什么
  if(response.data.meta.msg == '无效token'&&response.data.meta.status == 400){
    //销毁token
    window.localStorage.clear()
    new Vue().$message.error('有错误信息！！！')
    router.push('/login')
  }
  return response;

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 暴露 和接口相关的方法即可
// 接口抽取 - 登录验证接口
export const login = ({ username, password }) => {
  return http.post('login', {
    username,
    password
  })
}

//用户数据列表
export const users = ({ query, pagenum, pagesize }) => {
  return http.get('users', {
    // get请求的参数 如何自动拼接
    params: {
      query,
      pagenum,
      pagesize
    },
  })
}

//添加用户
export const addUser = ({ username, password, email, mobile }) => {
  return http.post('/users', { username, password, email, mobile })
}

//编辑用户提交
export const editUser = ({id,email,mobile})=>{
  return http.put(`users/${id}`,{
    email,
    mobile
  })
}


export const menus = () => {
  return http.get('menus', {
    // headers: {
    //   Authorization: window.localStorage.getItem('token')
    // }
  })
}

//改变状态
export const changeStatus = ({uId,type}) => {
  return http.put(`users/${uId}/state/${type}`)
}


//获取权限
export const getRights = ()=>{
  return http.get(`rights/list`)
}
export const getRightsTree = ()=>{
  return http.get(`rights/tree`)
}

//获取角色列表
export const getRoles = ()=>{
  return http.get(`roles`)
}


//分配角色
export const assignmentRoles = ({id,rid})=>{
  return http.put(`users/${id}/role`,{
    rid
  })
}


//角色授权 roles/:roleId/rights
export const giveRights = ({roleId,rids}) =>{
  return http.post(`roles/${roleId}/rights`,{
    rids
  })
}


//删除角色
export const delRoles = ({id})=>{
  return http.delete(`roles/${id}`)
}

//删除角色指定权限
export const delRolePower = ({roleId,rightId})=>{
  return http.delete(`roles/${roleId}/rights/${rightId}`)
}


//添加角色
export const addRoles = ({roleName,roleDesc})=>{
  return http.post(`roles`,{
    roleName,
    roleDesc
  })
}



//删除用户
export const delUser = ({id})=>{
  return http.delete(`users/${id}`)
}


//编辑角色 roles/:id
export const editRoles = ({id,roleName,roleDesc})=>{
  return http.put(`roles/${id}`,{
    roleName,
    roleDesc
  })
}

//////////////////

//商品列表数据
export const goodsList = ({query,pagenum,pagesize})=>{
  return http.get(`goods`,{
    params: {
      query,
      pagenum,
      pagesize
    },
  })
} 


//获取订单数据
export const goodsOrder = ({pagenum,pagesize})=>{
  return http.get(`orders`,{
    params:{
      pagenum,
      pagesize
    }
  })
}