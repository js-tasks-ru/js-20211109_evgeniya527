export default class SortableTable {
	constructor(headerConfig = [], data = []) {
		this.headerConfig = headerConfig;
		this.data = data;	

		this.render();
	}
	
	get headerTemplate(){
		
		return this.headerConfig.map(item => {
			return
			`
			<div class="sortable-table__cell" 
				data-id="$item.id" 
				data-sortable="$item.sortable" 
				data-order="asc">
			
					<span>$item.title</span>
			</div>
		`;}).join('');
	}


	get bodyTemplate(){
		
		return this.data.map(dataItem => {
			return
			`
			<a href="/products/$dataItem.id" class="sortable-table__row">
				this.bodyItemTemplate(dataItem);
			</a>	
		`;}).join('');
	}
		
		

	bodyItemTemplate(dataItem){
		
		const headerConfigIds = headerConfig.map(item => item.id);
		
		for (id of headerConfigIds){
			return 
			`			
				<div class="sortable-table__cell">dataItem.id</div>;
			`			
		}
	}

			

	get wholeTemplate(){
			`			
		<div data-element="header" class="sortable-table__header sortable-table__row">	
			$this.headerTemplate;
		</div>

		<div data-element="body" class="sortable-table__body">
			$this.bodyTemplate;
		</div>	
			`		
	}
			
  
	render (){
		const element = document.createElement('div');
		element.innerHTML = this.wholeTemplate;
		this.element = element.firstElementChild;
		
		
	}
  
  
	sort (fieldValue, orderValue){
	}
	
  
}

