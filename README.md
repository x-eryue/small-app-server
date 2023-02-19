# small-app-server

#### 项目描述

+ 用node.js以express框架构建的服务端
+ http://127.0.0.1:3000/api/

#### 接口文档

##### 用户:

1. 登录

| 地址         | /users/login       |
| ------------ | ------------------ |
| 描述         | 用户登录           |
| 请求方式     | POST               |
| 参数         | user_name,user_pwd |
| 返回数据格式 | JSON               |
| 返回数据样例 |                    |

2. 注册

| 地址         | /users/register                                   |
| ------------ | ------------------------------------------------- |
| 描述         | 用户注册                                          |
| 请求方式     | POST                                              |
| 参数         | user_name,user_pwd,nick_name,user_avatar:"可不传" |
| 返回数据格式 | JSON                                              |
| 返回数据样例 |                                                   |

3.用户头像

| 地址         | /users/user_avatar                                           |
| ------------ | ------------------------------------------------------------ |
| 描述         | 上传用户头像                                                 |
| 请求方式     | POST                                                         |
| 参数         | user_avatar：file        {"content-type": "multipart/from-data"} |
| 返回数据格式 | JSON                                                         |
| 返回数据样例 |                                                              |

4. token验证

| 地址         | /users/verifyToken                        |
| ------------ | ----------------------------------------- |
| 描述         | token验证                                 |
| 请求方式     | POST                                      |
| 参数         | header:{Authorization: `Bearer ${token}`} |
| 返回数据格式 | JSON                                      |
| 返回数据样例 |                                           |

##### 图片：

1. 轮播图

| 地址         | /pic/getlunbo  |
| ------------ | -------------- |
| 描述         | 获取首页轮播图 |
| 请求方式     | GET            |
| 参数         | 无             |
| 返回数据格式 | JSON           |
| 返回数据样例 |                |



