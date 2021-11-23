export default class ColumnChart {
	constructor(data=[], label='', value=0, link='', formatHeading) {
		
		//this.getTemplate ()
		//this.initEventListeners();
		//this.remove ();
		//this.destroy();

		
		this.data = data,
        this.label = label,
        this.value = value,
        this.link = link,
		//this.formatHeading = formatHeading: data => `$${data}`
		
		this.render();
	}
	
	getTemplate () {
		return `
		<div class="column-chart column-chart_loading" style="--chart-height: 50">
		  <div class="column-chart__title">
				Total ${this.label}
			<a class="column-chart__link" href="#">View all</a>
		  </div>
		  <div class="column-chart__container">
			<div data-element="header" class="column-chart__header">
				${this.value}
			</div>
			<div data-element="body" class="column-chart__chart">
				${ this.getHTML(this.data)}
				
			</div>
		  </div>
		</div> 
		`
	}

	render() {
		const element = document.createElement('div'); // (*)
		
		element.innerHTML = this.getTemplate();
		
		// NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
		// который мы создали на строке (*)
		this.element = element.firstElementChild;
	}	
  

	remove() {
		this.element.remove();
	}

	destroy() {
		this.remove();
    // NOTE: удаляем обработчики событий, если они есть
	}  


	getColumnProps(data) {
		const maxValue = Math.max(data);
		const scale = 50 / maxValue;

		return data.map(item => {
		return {
		  percent: (item / maxValue * 100).toFixed(0) + '%',
		  value: String(Math.floor(item * scale))
		};
	  });
	}
	
	
	getHTML(data){
		const arrayOfObj = this.getColumnProps(data);
		
		let dataString = '';
		for (let obj of arrayOfObj){
			dataString += '<div style="--value:'+ obj.value + '" data-tooltip="'+obj.percent+'"></div>'
		}
		
		return dataString;
	}	

	//initEventListeners () {
    // пока не нужен NOTE: в данном методе добавляем обработчики событий, если они есть
	//}
	

}





	  
