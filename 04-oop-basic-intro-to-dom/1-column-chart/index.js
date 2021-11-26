export default class ColumnChart {
	
	subElements = {};
	chartHeight = 50;
	
	constructor({
		data = [], 
		label = '', 
		value = 0, 
		link = '', 
		formatHeading = data => data
		} = {}) {
		
		this.data = data,
        this.label = label,
        this.link = link,
		this.value = formatHeading(value);
		
		this.render();
	}
	
	get template() {
		return `
		<div class="column-chart column-chart_loading" style="--chart-height: 50">


		  <div class="column-chart__title">
				Total ${this.label}

			<a class="column-chart__link" href="${this.link}">View all</a>
			
		  </div>
		  <div class="column-chart__container">
			<div data-element="header" class="column-chart__header">
				${this.value}
			</div>
			<div data-element="body" class="column-chart__chart">
				${this.getColumnBody()}
			</div>			
		  </div>
		</div> 
		`;
	}
	
	// в чем преимущество, когда link передается через  getLink , это не усложняет шаблон?
	//  return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';


	render() {
		const element = document.createElement('div'); 
		
		element.innerHTML = this.template;

		this.element = element.firstElementChild;
		
		if (this.data.length) {
			this.element.classList.remove('column-chart_loading');
		}	

		this.subElements = this.getSubElements(this.element);	
		

		
	// почему с getSubElements и getColumnBody не делается геттер, как с getTemplates? есть какое-то правило?
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
  


	getColumnBody() {
		const maxValue = Math.max(...this.data);
		const scale = this.chartHeight / maxValue;

		return this.data.map(item => {
			const percent = (item / maxValue * 100).toFixed(0);
			
			return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
		
	  }).join('');
	}
	
	
	update(data) {
		this.data = data;
		this.subElements.body.innerHTML = this.getColumnBody(data);
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





	  
