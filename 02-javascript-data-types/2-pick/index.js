/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {

	const newObj = {};	
	
	for (const field of fields){
		if (Object.entries(obj).find(element => element[0] === field)){
				newObj[field] = obj[field];
			}
	}
	
	return newObj;

};


/* вопрос: правильно ли я понимаю, что 
из-за обращения типа element[0] этот вариант оказался защищен от передачи всякого неожиданного, например, методов в fields (пример, который был на лекции с "constructor")
и в целом имеет право на жизнь?
*/

