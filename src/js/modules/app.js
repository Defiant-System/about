
// about.app

{
	init() {

	},
	dispatch(event) {
		let Self = about.karaqu,
			spawn = event.spawn,
			xApp,
			xPath,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "spawn.open":
				Self.dispatch({ ...event, type: "show-app" });
				break;
			case "spawn.focus":
			case "spawn.blur":
				break;

			// toolbar events
			case "show-app":
				// copy value of "ported" from meta
				xPath = `sys://meta[@name="id"][@value="${event.app}"]/../meta[@namespace="${event.ns}"]/../..`;
				xApp = window.bluePrint.selectSingleNode(xPath);

				karaqu.message({ type: "load-app-icon", ns: event.ns, id: event.app })
					.then(res => {
						// render overview content
						el = window.render({
							template: "about-app",
							changePath: `//xsl:variable[@name="app"]`,
							changeSelect: `//Settings/Apps/i[@ns="${event.ns}"][@id="${event.app}"]`,
							target: spawn.find(".win-body_ content"),
						});
						// resize window body
						spawn.find(".win-body_").css({ height: el.height() });
					});
				return true;
			case "app-license":
				return true;
			case "app-issues":
				return true;
			case "app-source-code":
				return true;
		}
	}
}
