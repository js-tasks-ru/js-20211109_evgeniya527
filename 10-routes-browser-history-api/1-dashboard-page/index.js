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
	url = new URL('api/dashboard/bestsellers', BACKEND_URL);
	
	
	initComponents() {
		
		const now = new Date();
		const to = new Date();
		
		const from = new Date(now.setMonth(now.getMonth() - 1));
		
		const rangePicker = new RangePicker({
			from,
			to
		});

		const ordersChart = new ColumnChart({
			url: 'api/dashboard/orders',
			range: {
				from,
				to
			},
			label: 'orders',
			link: '#'
		});
		
		const salesChart = new ColumnChart({
			url: 'api/dashboard/sales',
			range: {
				from,
				to
			},
			label: 'sales'
		});
		
		const customersChart = new ColumnChart({
			url: 'api/dashboard/customers',
			range: {
				from,
				to
			},
			label: 'customers'
		});
		
		const sortableTable = new SortableTable(header, {
			url: `api/dashboard/bestsellers?from=${from.toISOString()}&to=${to.toISOString()}&_sort=title&_order=asc&_start=0&_end=30`,
			isSortLocally: true
		});
		
		this.components.rangePicker = rangePicker;
		this.components.ordersChart = ordersChart;
		this.components.salesChart = salesChart;
		this.components.customersChart = customersChart;
		this.components.sortableTable = sortableTable;
		
	}
	
	
	loadData (from, to){
		
		this.url.searchParams.set('_start', '0');
		this.url.searchParams.set('_end', '1');
		this.url.searchParams.set('_sort', 'title');
		this.url.searchParams.set('_order', 'asc');
		this.url.searchParams.set('_from', from.toISOString());
		this.url.searchParams.set('_to', to.toISOString());
		
		return fetchJson(this.url);
	}
	
	render() {
		const element = document.createElement('div');
		element.innerHTML = this.template();		
		this.element = element.firstElementChild;
		this.subElements = this.getSubElements(this.element);
	
		this.initComponents();

		for (const component of Object.keys(this.components)) {
			const subElement = this.subElements[component];
			
			const {element} = this.components[component];
			
			subElement.append(element);
		}	
		
		this.initEventListeners();

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
					
					<div class="rangepicker" data-element="rangePicker">

					</div>
	
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
	
	initEventListeners(){
		this.components.rangePicker.element.addEventListener('date-select', event => {
			const {from, to} = event.detail;
			this.updateComponents(from, to);
			});
	}
	
	
	async updateComponents(from, to){
		const data = await this.loadData(from, to);
		this.components.sortableTable.update(data);
		this.components.ordersChart.update(from, to);
		this.components.salesChart.update(from, to);
		this.components.customersChart.update(from, to);
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
