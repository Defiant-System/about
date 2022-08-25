
// about.app

{
	init() {

	},
	dispatch(event) {
		let Self = about.karaqu,
			Spawn = event.spawn,
			ns, app,
			xApp,
			xPath,
			func,
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
				// tab window element with info
				Spawn.el.data({ nsApp: `${event.ns}:${event.app}` });
				[ns, app] = Spawn.el.data("nsApp").split(":");

				// copy value of "ported" from meta
				xPath = `sys://meta[@name="id"][@value="${app}"]/../meta[@namespace="${ns}"]/../..`;
				xApp = window.bluePrint.selectSingleNode(xPath);

				if (xApp) {
					console.log("TODO!");
				}

				karaqu.message({ type: "load-app-icon", ns, id: app })
					.then(res => {
						// render overview content
						el = window.render({
							template: "about-app",
							changePath: `//xsl:variable[@name="app"]`,
							changeSelect: `//Settings/Apps/i[@ns="${ns}"][@id="${app}"]`,
							target: Spawn.find(".win-body_ content"),
						});
						// resize window body
						Spawn.find(".win-body_").css({ height: el.height() });
					});
				return true;
			case "app-license":
				// get app details
				[ns, app] = Spawn.el.data("nsApp").split(":");
				
				// render view
				el = window.render({
					template: "app-license",
					match: `sys://Settings/Apps/i[@ns="${ns}"][@id="${app}"]`,
					target: Spawn.find(".win-body_ content"),
				});
				// put license content into DOM
				func = () => {
					let text = Self.license,
						name = text.match(/^# .+$/gm)[0],
						version = text.match(/^version .+$/gmi)[0];
					// update header
					el.find("h2").html(`${name.slice(2)}<span>${version}</span>`);
					// clear header from 
					text = text.replace(name, "");
					text = text.replace(version, "");

					let htm = window.marked(text);
					el.find(".license-text").html(htm);

					// resize window
					Spawn.find(".win-body_").css({ height: el.height() });
				};

				if (Self.license) func();
				else {
					window.fetch(`/app/${ns}/${app}/LICENSE`)
						.then(res => {
							// remember for later
							Self.license = res;
							// put license into view
							func();
						});
				}
				return true;
			case "app-source-code":
				// get app details
				[ns, app] = Spawn.el.data("nsApp").split(":");
				// copy value of "ported" from meta
				xPath = `sys://meta[@name="id"][@value="${app}"]/../meta[@namespace="${ns}"]/../..`;
				xApp = window.bluePrint.selectSingleNode(xPath);

				console.log( xApp );

				return true;
			case "show-license":
				Spawn.find(".toolbar-tool_[data-click='app-license']").trigger("click");
				break;
		}
	}
}
