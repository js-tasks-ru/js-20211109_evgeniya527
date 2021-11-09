/**
 * sum
 * @param {number} m base
 * @param {number} n index
 * @returns {number}
 */
export default function sum(m, n) {
	if (isFinite(m)&&isFinite(n)){
		return ((+m)+(+n)); //для выражений типа sum("2",5)
	}
	return ("По меньшей мере один аргумент - не число, поэтому сложить не получится");
}

