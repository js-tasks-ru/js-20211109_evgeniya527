/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
	//попытка решить через reduce
	
	const pathArray = path.split('.');
		
	return (function (sourseObj){
				
		if (!Object.keys(sourseObj).length) return; 
		
		let obj = sourseObj;		
		return pathArray.reduce((result, item, index) => obj = obj[item], {});
		
	})
}


