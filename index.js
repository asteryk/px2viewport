/** 
 * px2viewport loader
 * 参考postcss-px-to-viewport写的一般webpack css px to vw loader
 * author：asteryk
 * */ 
// 用来拷贝配置项
var objectAssign = require('object-assign');
// 默认配置项
var defaults = {
	viewportWidth: 750, //设计稿宽度
	viewportUnit: 'vw', //参考单位
	minPixelValue: 1, //最小不需要转换的值：1px
	precision: 5 //最大支持小数位数
};
// 正则，匹配 数字+px
var REG = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/ig;

/**
 * px to vw
 * @param {string} str css内容
 * @param {object} opts 配置项
 * @return 替换px后的css
 */ 
function px2vw(str, opts) {
	// 替换
	return str.replace(REG, createPxReplace(opts.viewportWidth, opts.minPixelValue, opts.precision, opts.viewportUnit));
}
/**
 * 正则里的替换方法
 * @param {*} viewportSize 设计稿宽度
 * @param {*} minPixelValue 最小不需要转换的值：1px
 * @param {*} unitPrecision 小数位数
 * @param {*} viewportUnit 参考单位
 */ 
function createPxReplace(viewportSize, minPixelValue, unitPrecision, viewportUnit) {
	return function (m, $1) {
		if (!$1) return m;
		// console.log($1);
		var pixels = parseFloat($1);
		if (pixels <= minPixelValue) return m;
		return toFixed((pixels / viewportSize * 100), unitPrecision) + viewportUnit;
	};
}
/**
 * 小数保留方法
 * @param {*} number 数字
 * @param {*} precision 小数位数
 */ 
function toFixed(number, precision) {
	var multiplier = Math.pow(10, precision + 1),
		wholeNumber = Math.floor(number * multiplier);
	return Math.round(wholeNumber / 10) * 10 / multiplier;
}
// 模块本身方法
module.exports = function (content, options) {
	// 缓存
	this.cacheable();
	// 异步输出
	var callback = this.async();
	// 更新自定义配置
	var opts = objectAssign({}, defaults, options);
	// 异步输出结果
	callback(null, px2vw(content, opts));
}