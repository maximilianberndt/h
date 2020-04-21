/*************************************
*
*    Reveal Elements on Scroll
*
*	// Create new slider
*	let slider = new Slider
*
*	// Remove from raf to save performance
*	slider.stop();
*
*	// Put back into raf
*	slider.stop();
*
*************************************/

import { utils } from "../utils/main.js"

export class Slider {
	
	constructor(container) {

		if(!container) return

		this._bind();

		this.options = {
			container: container, 
			nextButton: '.next',
			prevButton: '.prev',
			slider: '.slider',
			slideEl: '.slide-el',
			speed: 2,
			ease: 0.1,
		}

		this.data = {
			min: 0,
			max: 0,
			isDragging: false,
			progress: 0,

			startX: 0,
			endX: 0,

			lastX: 0,
			curX: 0,

			raf: null,
		}

		this._fillCache();

		this._getBounds();

		this._addEvents();

		this._start();
	}

	findClosest(goal, array) {
		let closest = array.reduce(function(prev, curr) {
		  return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
		});

		return array.indexOf(closest);
	}


	_bind() {
		utils.bind(this, ['nextSlide', 'prevSlide', 'run', 'on', 'off', 'setPos', '_onResize']);
	}

	_addEvents() {
		let p = this.data.container;
		let _this = this;

		if(this.nextButton) this.nextButton.addEventListener("click", this.nextSlide );
		if(this.nextButton) this.prevButton.addEventListener("click", this.prevSlide );

		window.addEventListener("resize", debounce(_this._onResize , 250))

		this.container.addEventListener("mousedown", this.on );
		document.body.addEventListener("mouseup", this.off );
		this.container.addEventListener("mousemove", this.setPos );

		this.container.addEventListener("touchstart", this.on );
		document.body.addEventListener("touchend", this.off );
		this.container.addEventListener("touchmove", this.setPos, true )
	}

	_getBounds() {
		let totalWidth = 0;
		this.snapPoints = [];

		for(let i = 0; i < this.slides.length; i++) {
			let slideBCR = this.slides[i].getBoundingClientRect();

			let slideWidth = slideBCR.width;

			let snapPoint = - (slideWidth/2 + totalWidth);
			
			this.snapPoints.push(snapPoint);

			totalWidth += slideWidth
		}

		this.data.max = -(totalWidth - G.width);
		this.data.min = 0;
	}

	_onResize() {
		this._getBounds()
	}

	_destroy() {
		this._stop();

		if(this.nextButton) this.nextButton.removeEventListener("click", this.nextSlide );
		if(this.nextButton) this.prevButton.removeEventListener("click", this.prevSlide );

		window.removeEventListener("resize", debounce(_this._onResize , 250))

		this.container.removeEventListener("mousedown", this.on );
		document.body.removeEventListener("mouseup", this.off );
		this.container.removeEventListener("mousemove", this.setPos );

		this.container.removeEventListener("touchstart", this.on );
		document.body.removeEventListener("touchend", this.off );
		this.container.removeEventListener("touchmove", this.setPos, true )
	}

	_fillCache() {
		let p = this.container = this.options.container;

		this.nextButton = E.get(this.options.nextButton, p);
		this.prevButton = E.get(this.options.prevButton, p);
		this.slider = E.get(this.options.slider, p)[0];

		this.slides = E.get(this.options.slideEl, p);
	}

	_start() {
		this.data.raf = utils.R.add(this.run);
	}

	_stop() {
		utils.R.remove(this.data.raf);
	}





	on(e) {
		this.data.startX = e.clientX || e.touches[0].pageX;
		this.data.isDragging = true;
	}

	off() {
		this.data.endX = this.data.curX;
		this.data.isDragging = false;
	}

	setPos(e) {
		if (!this.data.isDragging) return;

		let cur = e.clientX || e.touches[0].pageX;
		this.data.curX = this.data.endX + ((cur - this.data.startX) * this.options.speed);
		this.data.curX = utils.clamp(this.data.curX, this.data.max, this.data.min);
	}


	run() {
		this.data.lastX = utils.lerp(this.data.lastX, this.data.curX, this.options.ease);
		this.data.lastX = Math.floor(this.data.lastX * 100) / 100;

		this.data.progress = utils.map(this.data.lastX, this.data.min, this.data.max, 0, 1);
		this.data.progress = Math.floor(this.data.progress * 100) / 100;

		this.slider.style.cssText = `transform: translate3d(${this.data.lastX }px, 0px, 0px)`
	}



	nextSlide() {
		let curSnappoint = this.findClosest(this.data.lastX, this.snapPoints);
		curSnappoint++;

		let newSnapPos = this.snapPoints[curSnappoint];

		if(newSnapPos && newSnapPos > this.data.max) this.data.curX = this.data.endX = newSnapPos;
	}

	prevSlide() {
		let curSnappoint = this.findClosest(this.data.lastX, this.snapPoints);
		curSnappoint--;

		let newSnapPos = this.snapPoints[curSnappoint];

		if(newSnapPos && newSnapPos > this.data.max) this.data.curX = this.data.endX = newSnapPos;
	}

}