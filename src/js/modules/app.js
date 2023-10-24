
// about.app

{
	init() {

	},
	dispatch(event) {
		let APP = about,
			Self = APP.karaqu,
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
				
				// DEV-ONLY-START
				Test.init(Self, Spawn);
				// DEV-ONLY-END
				break;
			case "spawn.focus":
			case "spawn.blur":
				break;

			// toolbar events
			case "show-app":
				if (!Spawn.el.data("nsApp")) {
					// tab window element with info
					Spawn.el.data({ nsApp: `${event.ns}:${event.app}` });
				}
				[ns, app] = Spawn.el.data("nsApp").split(":");

				// copy value of "ported" from meta
				xPath = `sys://meta[@name="id"][@value="${app}"]/../meta[@namespace="${ns}"]/../..`;
				xApp = window.bluePrint.selectSingleNode(xPath);

				if (xApp) {
					xPath = `sys://Settings/Apps/i[@ns="${ns}"][@id="${app}"]`;
					let sApp = window.bluePrint.selectSingleNode(xPath),
						xPorted = xApp.selectSingleNode(".//meta[@ported]");
					if (xPorted && !sApp.getAttribute("ported")) {
						sApp.setAttribute("ported", xPorted.getAttribute("ported"));
					}

					["title", "author", "license"].map(name => {
						let meta = xApp.selectSingleNode(`.//meta[@name="${name}"]`);
						sApp.setAttribute(name, meta.getAttribute("value"));
						if (name === "title") {
							sApp.setAttribute("version", meta.getAttribute("version"));
						}
					});
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

				// fetch app stats, if not already fetched
				karaqu.message({ type: "get-app-stat", ns: ns, id: app })
					.then(stat => {
						let appName = xApp.selectSingleNode(`.//meta[@name="title"]`).getAttribute("value"),
							total = stat.map(x => +x.size).reduce((a, b) => a + b, 0),
							fGroups = window.bluePrint.selectSingleNode(`//FileGroups`),
							other = 100;

						// add script
						stat.push({ name: "main.js", kind: "js", size: xApp.selectSingleNode(`./script`).textContent.length });
						// add style
						stat.push({ name: "main.css", kind: "css", size: xApp.selectSingleNode(`./style`).textContent.length });
						
						// calculate file group sizes
						fGroups.selectNodes(`./i`).map(xGroup => {
							let gTotal = 0;
							xGroup.selectNodes(`./i[@kind]`).map(x => {
								gTotal += stat.filter(f => f.kind === x.getAttribute("kind"))
												.map(x => +x.size).reduce((a, b) => a + b, 0);
							});
							if (xGroup.getAttribute("name") !== "Other") {
								gTotal = Math.round(gTotal/total * 100);
								other -= gTotal;
								xGroup.setAttribute("width", gTotal);
							}
						});
						// contents data
						fGroups.setAttribute("total", total);
						fGroups.setAttribute("files", stat.length);
						fGroups.setAttribute("appName", appName);
						// render contents
						el = window.render({
							template: "app-source-code",
							changePath: `//xsl:variable[@name="app"]`,
							changeSelect: `//applications/Application/*/meta[@name="id"][@value="${app}"]/../..`,
							target: Spawn.find(".win-body_ content"),
						});
						// resize window
						Spawn.find(".win-body_").css({ height: el.height() });
				});

				return true;
			case "show-license":
				Spawn.find(".toolbar-tool_[data-click='app-license']").trigger("click");
				break;
			case "open-github":
				switch (event.arg) {
					case "code":
					case "issue":
					case "stars":
						let link = event.el.parents(".link-buttons");
						window.open(link.attr("data-link"));
						break;
				}
				break;
		}
	}
}
