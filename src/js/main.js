
@import "./modules/marked.min.js";

const about = {
	init() {
		
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
			case "window.init":
				// spawn = window.open("spawn-karaqu");
				// Self.spawn.dispatch({ ...event, type: "spawn.init", spawn });
				break;
			case "show-app":
				spawn = window.open("spawn-app");
				Self.dispatch({ ...event, spawn });
				break;
		}
	},
	karaqu: @import "./modules/karaqu.js",
	app: @import "./modules/app.js",
};

window.exports = about;
