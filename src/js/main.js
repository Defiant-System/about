
@import "./modules/marked.min.js";

const about = {
	init() {
		this.spawns = {};
		// listen to system event
		karaqu.on("sys:window.closed", this.dispatch);
	},
	async dispatch(event) {
		let Self = about,
			spawn = event.spawn,
			el;
		// proxy spawn events
		if (spawn) {
			let [a, s, name] = spawn._id.split("-");
			return Self[name].dispatch(event);
		}
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.closed":
				if (Self.spawns[event.detail]) {
					Self.spawns[event.detail].close();
				}
				break;
			case "about-karaqu":
			case "window.init":
				spawn = window.open("spawn-karaqu");
				Self.karaqu.dispatch({ ...event, type: "spawn.init", spawn });
				break;
			case "show-app":
				spawn = window.open("spawn-app");
				// save reference to app for close event
				Self.spawns[`${event.ns}:${event.app}`] = spawn;
				Self.dispatch({ ...event, spawn });
				break;
		}
	},
	karaqu: @import "./modules/karaqu.js",
	app: @import "./modules/app.js",
};

window.exports = about;
