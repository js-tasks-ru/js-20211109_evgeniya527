import RangePicker from './components/range-picker/src/index.js';
import SortableTable from './components/sortable-table/src/index.js';
import ColumnChart from './components/column-chart/src/index.js';
import header from './bestsellers-header.js';

import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class Page {
	
	element;
	subElements = {};
	components = {};
	
	
	initComponents() {

		const ordersChart = new ColumnChart({
			url: 'api/dashboard/orders',
			range: {
				from: new Date('2020-04-06'),
				to: new Date('2020-05-06'),
			},
			label: 'orders',
			link: '#'
		});
		
		const salesChart = new ColumnChart({
			url: 'api/dashboard/sales',
			range: {
				from: new Date('2020-04-06'),
				to: new Date('2020-05-06'),
			},
			label: 'sales'
		});
		
		const customersChart = new ColumnChart({
			url: 'api/dashboard/customers',
			range: {
				from: new Date('2020-04-06'),
				to: new Date('2020-05-06'),
			},
			label: 'customers'
		});
		
		const sortableTable = new SortableTable(header, {

			url: `api/dashboard/bestsellers?from=2021-11-13T13%3A47%3A25.012Z&to=2021-12-13T13%3A47%3A25.012Z&_sort=title&_order=asc&_start=0&_end=30`,
			isSortLocally: true
		});
		
		this.components.ordersChart = ordersChart;
		this.components.salesChart = salesChart;
		this.components.customersChart = customersChart;
		this.components.sortableTable = sortableTable;
		
		// с rangePicker не успеваю пока разобраться
	}
	
	render() {
		const element = document.createElement('div');
		element.innerHTML = this.template();		
		this.element = element.firstElementChild;
		this.subElements = this.getSubElements(this.element);
	
		this.initComponents();

		for (const component of Object.keys(this.components)) {
			const subElement = this.subElements[component];
			
			const full_elem = this.components[component].element;
			subElement.append(full_elem);
		}	

		return this.element;
	}
	
	
	getSubElements(element) {
		const subElements = {};
		const elements = element.querySelectorAll('[data-element]');
		
		for (const item of elements) {
			subElements[item.dataset.element] = item;
		}
		
		return subElements;
	}
	
	
	template() {
		return `
			<div class="dashboard full-height flex-column">
				<div class="content__top-panel">
					<h2 class="page-title">Панель управления</h2>
				</div>
				<div class="dashboard__charts">
					<div data-element="ordersChart" class="dashboard__chart_orders"></div>
					<div data-element="salesChart" class="dashboard__chart_sales"></div>
					<div data-element="customersChart" class="dashboard__chart_customers"></div>
				</div>
				<h3 class="block-title">Лидеры продаж</h3>
				<div data-element="sortableTable">
				</div>
				
				<div data-elem="loading" class="loading-line sortable-table__loading-line">
				</div>    
				<div data-elem="emptyPlaceholder" class="sortable-table__empty-placeholder"><div>Нет данных</div>
				</div>
			</div>
		`;
	}

	
	remove() {
		this.element.remove();
	}
	
	destroy() {
		this.remove();
	
		for (const component of Object.values(this.components)) {
			component.destroy();
		}
	}

}
