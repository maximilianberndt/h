/*************************************
*
*   Render Queue running at 60fps
*
*	// Add function
*	const functionId = R.add(function);
*
*	// Remove function
*	R.remove(functionId);
*
*	// Start Rendering
*	R.start();
*
*	// Stop Rendering
*	R.stop();
*
*
*************************************/
import { rand } from '../Functions/Math';


export const R = {
	// Variables for running animation frame at 60fps
	_data: {
		raf: undefined,
		stop: false,
		frameCount: 0,
		fps: 60,
		fpsInterval: null,
		startTime: null,
		now: null,
		then: null,
		elapsed: null
	},

	renderQueue: [],

	add: function (fn) {

		let newFn = {
			id: Math.round(rand(1, 99999999)),
			fn: fn
		}

		// Add to render loop
		this.renderQueue.push(newFn);

		// Return the id so function can be removed later
		return (newFn.id);
	},

	remove: function (id) {
		var _this = this;

		for (let i = 0; i < _this.renderQueue.length; i++) {
			if (_this.renderQueue[i].id === id) {

				_this.renderQueue.splice(i, 1);

				return undefined;
			}
		}
	},

	start: function () {
		this._data.fpsInterval = 1000 / this._data.fps;
		this._data.then = Date.now();
		this._data.startTime = this._data.then;

		this.render();
	},


	stop: function () {
		window.cancelAnimationFrame(this._data.raf);
	},

	render: function () {

		// stop
		if (this._data.stop) return;

		// request another frame
		this._data.raf = window.requestAnimationFrame(() => this.render());

		// calc elapsed time since last loop
		this._data.now = Date.now();
		this._data.elapsed = this._data.now - this._data.then;

		// if enough time has elapsed, draw the next frame
		if (this._data.elapsed < this._data.fpsInterval) return;

		// Get ready for next frame by setting then=now, but...
		// Also, adjust for fpsInterval not being multiple of 16.67
		this._data.then = this._data.now - (this._data.elapsed % this._data.fpsInterval);

		// Execute all functions
		let rqLength = this.renderQueue.length
		for (let i = 0; i < rqLength; i++) {
			this.renderQueue[i].fn()
		}


		// TESTING - Report fps
		// var sinceStart = this._data.now - this._data.startTime;
		// var currentFps = Math.round(1000 / (sinceStart / ++ this._data.frameCount) * 100) / 100;
		// console.log(currentFps);
	}
}
