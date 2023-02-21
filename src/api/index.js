/* //将四个模块请求的接口函数统一暴露
import * as trademark from './product/tradeMark';
import * as attr from './product/attr';
import * as spu from './product/spu';


//引入权限相关的接口文件
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission'
//对外暴露
*/
import * as test from "./test";
import * as home from "./home";
export default {
  test,
  home
};
