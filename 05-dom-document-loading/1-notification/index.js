export default class NotificationMessage {
	
	
	
	constructor(message = '', {
		duration = 0, 
		type = ''
		} = {}) 
	{
		this.message = message;
		this.duration = duration;
		this.type = type;
		
		this.render();
	}
	
	
	get template() {
		return `
		<div class="notification ${this.type}" style="--value:20s">
			<div class="timer"></div>
			<div class="inner-wrapper">
				<div class="notification-header">${this.type}</div>
				<div class="notification-body">
					${this.message}
				</div>
			</div>
		</div>		
		`;
	}

	render() {
		
		const element = document.createElement('div'); 
		
		element.innerHTML = this.template;

		this.element = element.firstElementChild;

	}
	
	show(){	

		document.body.append(this.element);
		
		setTimeout(this.remove.bind(this), this.duration);

	}
	
	
	remove() {
		if (this.element) {
			this.element.remove();
		}
	}

	destroy() {
		this.remove();
		this.element = null;
	}	
	
}
