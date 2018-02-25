## px to viewport

---

### use

`require('css-loader!px2viewport!./test.css')`

```````
{
  test: /\.css$/,
  use: [  
          'style-loader',
          'css-loader',
          'px2vw-loader'
    }]
}
``````

### config

``````
var opts = {
	viewportWidth: 750, //设计稿宽度 Design draft width
	viewportUnit: 'vw', //参考单位 Reference unit
	minPixelValue: 1, //最小不需要转换的值：1px min pixel not need transfer
	precision: 5 //最大支持小数位数 precision
};
```````