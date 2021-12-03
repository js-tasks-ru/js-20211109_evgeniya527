export default class SortableTable {
	
	element;
	subElements = {};
	
	constructor(headerConfig = [], {
		data = [],
		sorted = {
			id: headerConfig.find(item => item.sortable).id,
			order: 'asc'
		}} = {}) {
			this.headerConfig = headerConfig;
			this.data = data;
			this.sorted = sorted;

			this.render();
	}
	

	onSortClick = event => {

		const toggleOrder = order => {
			const orders = {
				asc: 'desc',
				desc: 'asc'
			};		
			return orders[order];
		};
	
		const column = event.target.closest('[data-sortable="true"]');

	
		if (column){		

			const newOrder = toggleOrder(column.dataset.order);	
			
			// понимаю, что можно сразу деструктурировать - const { id, order } = column.dataset;
			// но, мне кажется, понятность немного затрудняется, так как надо постоянно запоминать, что откуда берется, поэтому не использую
			
			column.dataset.order = newOrder;
			const sortedData = this.sortData(column.dataset.id, column.dataset.order);
	
			
			const arrow = column.querySelector('.sortable-table__sort-arrow');
			if(!arrow){
				column.append(this.subElements.arrow)
			};	
			this.subElements.body.innerHTML = this.getTableRows(sortedData);
		};
	}	
	
	getTableHeader(){
		return `<div data-element="header" class="sortable-table__header sortable-table__row">
			${this.headerConfig.map(item => this.getHeaderRow(item)).join('')}
		</div>`;
	}
	
	
	getHeaderRow ({id, title, sortable}) {
		const order = this.sorted.id === id ? this.sorted.order : 'asc';

		return `
		  <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
			<span>${title}</span>
			${this.getHeaderSortingArrow(id)}
		  </div>
		`;
	}	
	

	getHeaderSortingArrow (id) {
		const isOrderExist = this.sorted.id === id ? this.sorted.order : '';

		return isOrderExist
			? `<span data-element="arrow" class="sortable-table__sort-arrow">
				<span class="sort-arrow"></span>
			</span>`
			: '';
	}

	
	getTableBody(data) {
		return `
			<div data-element="body" class="sortable-table__body">
				${this.getTableRows(data)}
			</div>`;
	}
	

	getTableRows (data) {
		return data.map(item => `
			<div class="sortable-table__row">
				${this.getTableRow(item)}
			</div>`
		).join('');
	}
	
	
	getTableRow (item) {
		const cells = this.headerConfig.map(({id, template}) => {
			return {
				id,
				template
			};
		});
		
		return cells.map(({id, template}) => {
			return template
				? template(item[id])
				: `<div class="sortable-table__cell">${item[id]}</div>`;
		}).join('');
	}


	getTable(data) {
		return `
			<div class="sortable-table">
				${this.getTableHeader()}
				${this.getTableBody(data)}
			</div>`;
	}

		

	render (){

		const sortedData = this.sortData(this.sorted.id, this.sorted.order);
				
		const element = document.createElement('div');
		element.innerHTML = this.getTable(sortedData);		
		this.element = element.firstElementChild;		
		this.subElements = this.getSubElements(this.element);
		
		this.subElements.header.addEventListener('pointerdown', this.onSortClick);
	
	}


	sortData(id, order) {
		const arr = [...this.data];
		const column = this.headerConfig.find(item => item.id === id);

		const direction = order === 'asc' ? 1 : -1;

		return arr.sort((a, b) => {
			switch (column.sortType) {
			case 'number':
				return direction * (a[id] - b[id]);
			case 'string':
				return direction * a[id].localeCompare(b[id], 'ru');
			case 'custom':
				return direction * column.customSorting(a, b);
			default:
				return direction * (a[id] - b[id]);
			}
		});
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
	
/*	

наверное, что-то пропустила... но почему так изменились remove и destroy? У Вас в решении так:

	  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
  
*/
  
}

