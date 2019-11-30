/*************************************
*
*    Reveal Elements on Scroll
*
*************************************/

import {E} from '../Element/E.js';
import {S} from '../Element/S.js';
import {R} from '../R.js';
import {G} from '../G.js';
import {M} from '../M.js';
import {Dom} from '../Dom.js';
// import {Mouse} from './MouseObserver.js';

export class Slider {
	
	constructor() {

		this._bind();

		this.options = {
			container: '.slider-container', 
			nextButton: '.next',
			prevButton: '.prev',
			slider: 'ul',
			speed: 2,
			ease: 0.1,
		}

		this.data = {
			min: 0,
			max: 0,
			isDragging: false,
			totalEls: 0,
			progress: 0,

			startX: 0,
			endX: 0,

			lastX: 0,
			curX: 0,

			raf: null,
		}
		this._fillCache();

		this._init();

		this._addEvents();

		this.data.raf = R.add(this.run);
	}


	_bind() {
		E.bind(this, ['nextSlide', 'prevSlide', 'run', 'on', 'off', 'setPos']);
	}

	_addEvents() {
		let p = this.data.container;

		E.add( E.get('.next', p), "click", this.nextSlide );
		E.add( E.get('.prev', p), "click", this.prevSlide );

		E.add( this.data.slider, "mousedown", this.on );
		E.add( Dom.body, "mouseup", this.off );
		E.add( this.data.slider, "mousemove", this.setPos );
	}

	_fillCache() {
		let p = this.data.container = E.get(this.options.container)[0];

		this.data.nextButton = E.get(this.options.nextButton, p)[0];
		this.data.prevButton = E.get(this.options.prevButton, p)[0];
		this.data.slider = E.get(this.options.slider, p)[0];
		this.data.slides = this.data.slider.children;

		this.data.totalEls = this.data.slides.length;
	}

	_init() {
		let totalWidth = 0;
		let slides = this.data.slides;

		for(let i = 0; i < slides.length; i++) {
			totalWidth += slides[i].getBoundingClientRect().width;
		}

		this.data.max = -totalWidth + this.data.container.getBoundingClientRect().width/2;
		this.data.min = 0;
		this.data.slider.style.width = totalWidth + "px";
	}

	on(e) {
		this.data.startX = e.clientX;
		this.data.isDragging = true;
	}

	off() {
		this.data.endX = this.data.curX;
		this.data.isDragging = false;
	}

	setPos(e) {
		if (!this.data.isDragging) return;

		this.data.curX = this.data.endX + ((e.clientX - this.data.startX) * this.options.speed);
		this.data.curX = M.clamp(this.data.curX, this.data.max, this.data.min);
	}


	run() {
		this.data.lastX = M.lerp(this.data.lastX, this.data.curX, this.options.ease);
		this.data.lastX = Math.floor(this.data.lastX * 100) / 100;

		this.data.progress = M.map(this.data.lastX, this.data.min, this.data.max, 0, 1);
		this.data.progress = Math.floor(this.data.progress * 100) / 100;;

		console.log(this.data.progress)


		S.t(this.data.slider, "px", this.data.lastX );
	}




	stop() {
	    R.remove(this.data.raf);
	    
	    E.add( E.get('.next', p), "click", this.nextSlide );
		E.add( E.get('.prev', p), "click", this.prevSlide );

		E.remove( this.data.slider, "mousedown", this.on );
		E.remove( Dom.body, "mouseup", this.off );
		E.remove( this.data.slider, "mousemove", this.setPos );
	}


	nextSlide() {
		console.log("next");
	}

	prevSlide() {
		console.log("prev");
	}

}