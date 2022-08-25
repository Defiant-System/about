
// about.karaqu

{
	init() {

	},
	dispatch(event) {
		let Self = about.karaqu,
			Spawn = event.spawn,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "spawn.open":
				Self.dispatch({ ...event, type: "about-karaqu" });
				break;
			case "spawn.focus":
			case "spawn.blur":
				break;

			// toolbar events
			case "about-karaqu":
			case "karaqu-storage":
			case "karaqu-eula":
			case "karaqu-privacy-policy":
				el = window.render({
					match: `//*`,
					template: event.type,
					target: Spawn.find(".win-body_ content"),
				});
				// resize window body
				Spawn.find(".win-body_").css({ height: el.height() });
				// special handling - markdown content
				if (event.type === "karaqu-privacy-policy") {
					if (!Self.pp) {
						// fetch license, if not already fetched
						window.fetch("~/help/privacy-policy.md")
							.then(md => {
								let htm = window.marked(md);
								Spawn.find(".pp-text").html(htm);
								// store for later
								Self.pp = md;
							});
					} else {
						let htm = window.marked(Self.pp);
						Spawn.find(".pp-text").html(htm);
					}
				}
				return true;
		}
	}
}
