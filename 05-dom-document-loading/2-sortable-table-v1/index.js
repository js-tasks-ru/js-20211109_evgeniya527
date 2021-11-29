export default class SortableTable {
	constructor(headerConfig = [], data = []) {
		this.headerConfig = headerConfig;
		this.data = Array.isArray(data) ? data : data.data;	

		this.render();
	}
	
	subElements = {};
	
	getTableBody(data){	
	
		const tableData = [...data];
		
		return (`
			<div class = "sortable-table">		
					${this.subElements.body ? "" : this.getHeader()}
					
				<div data-element = "body" class = "sortable-table__body">
					${tableData.map(tableItem => this.getTableRows(tableItem)).join('')}
				</div>
				
			</div>	
			`);		
	}
	
	
	getHeader () {
		return (`
			<div data-element="header" class="sortable-table__header sortable-table__row">
			${this.headerConfig.map((item) => {
				return (`
				<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
				<span>${item.title}</span>
				<span data-element="arrow" class="sortable-table__sort-arrow">
					<span class="sort-arrow"></span>
				</span>
				</div>`)
				}).join('')}
			</div>
		`);
	}
	

	getTableRows (item){
		const rowItems = this.headerConfig.map((item) => item.id)
		
		return (`
		   <a href="#" class="sortable-table__row">
			  ${rowItems.map((itemName) => {
			  if (itemName === "images") {
				return (`
				  <div class="sortable-table__cell">
				  <img class="sortable-table-image" alt="Image" src="${item[itemName][0]?.url || 'https://via.placeholder.com/32'}">
				  </div>
				  `)
			  }
			  if (itemName !== "images") {
				return (`
				  <div class="sortable-table__cell">${item[itemName]}</div>
				  `)
			  }
			}).join('')}
		   </a>
		   `);
	}

			

	render (){
		const element = document.createElement('div');
		element.innerHTML = this.getTableBody(this.data);
		this.element = element.firstElementChild;
		
		this.subElements = this.getSubElements(this.element);
		
	}
  
	getSubElements(element) {
		const result = {};
		const elements = element.querySelectorAll('[data-element]');

		for (const subElement of elements) {
			const name = subElement.dataset.element;

			result[name] = subElement;
		}

		return result;
	}
	
	updateTable (arr) {
		return this.subElements.body.innerHTML = this.getTableBody(arr);
	}
	

/*
вопрос -
сортировка работает по виду правильно, но тесты падают. Причем, в тестах, например, по цене, ожидается 3 и 53, а там есть цены и выше 53х...

  it('should sort "asc" correctly for "sortType" equal number', () => {
 
...
    expect(firstRow.children[cellIndex].textContent).toEqual('3');
    expect(lastRow.children[cellIndex].textContent).toEqual('53');

*/
	
  
	sort (fieldValue, orderValue){

		const directions = {
			asc: 1,
			desc: -1
		};
		
		const direction = directions[orderValue];
			
		const arr = [...this.data];	
		
		const column = this.headerConfig.find(item => item.id === fieldValue);
		
		const {sortType} = column;
			
		const sortedData = arr.sort(
			function(a, b){
				
				switch (sortType){
				case 'number':
					return direction * (a[fieldValue] - b[fieldValue]);
				case 'string':
					return direction*(a[fieldValue].localeCompare(b[fieldValue], ['ru', 'en']));
				
				}
			});
			
		
			
		const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
		
		const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${fieldValue}"]`);
		
		allColumns.forEach(column => {
			column.dataset.order = '';
		});
		
		currentColumn.dataset.order = orderValue;
		
		this.subElements.body.innerHTML = this.getTableBody(sortedData);
	}
		
	remove () {
		if (this.element) {
			this.element.remove();
		}
	}

	destroy() {
		this.remove();
		this.element = null;
		this.subElements = {};
	}	
  
}

