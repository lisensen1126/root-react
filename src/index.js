import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {registerMicroApps,start,setDefaultMountApp,initGlobalState} from 'qiankun'

/**
 * Step1 注册子应用
 */
registerMicroApps(
  [
   {
     name:'child-vue',
     entry:'http://localhost:3001/',
     container:'#subapp-container',
     activeRule:'/child-vue'
    },
    {
      name: 'child-react',
      entry: 'http://localhost:3002/',
      container: '#subapp-container',
      activeRule: '/child-react',
    },
   ],{
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: blue;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: red;', app.name);
      },
    ],
  },
 )

 const { onGlobalStateChange } = initGlobalState({
  user: 'qiankun',
  ignore:'init'
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));




 /**
 * Step2 设置默认进入的子应用
 */
 setDefaultMountApp('/child-vue');

 /**
 * Step3 启动应用
 */
 start({prefetch:'all',sandbox :{experimentalStyleIsolation: true}})
// prefetch 配置为 true 则会在第一个微应用 mount 完成后开始预加载其他微应用的静态资源  配置为 'all' 则主应用 start 后即开始预加载所有微应用静态资源  配置为 string[] 则会在第一个微应用 mounted 后开始加载数组内的微应用资源   配置为 function 则可完全自定义应用的资源加载时机 (首屏应用及次屏应用)
// sandbox 实现样式隔离设置  strictStyleIsolation:true 会新建一个沙箱,shadow-root,调试发现vue子应用无法正常渲染。
// singular singular: false 是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
ReactDOM.render(
  <React.StrictMode>
    <div id='subapp-container'></div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
