import Mock from 'mockjs';
import homeApi from './mockData/home';
import userApi from './mockData/user'
import permissionApi from './mockData/permission';


Mock.mock('/api/home/getTableData',homeApi.getTableData); 
Mock.mock('/api/home/getCountData',homeApi.getCountData); 
Mock.mock('/api/home/getEchartData',homeApi.getEchartData); 

//用户数据
Mock.mock('/api/user/add', 'post', userApi.createUser);
Mock.mock('/api/user/edit', 'post',userApi.updateUser);
Mock.mock('/api/user/del', 'post',userApi.deleteUser);
Mock.mock(/api\/user\/getUser/, userApi.getUserList);



Mock.mock(/api\/permission\/getMenu/,permissionApi.getMenu); 