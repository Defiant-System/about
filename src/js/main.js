
@import "./modules/marked.min.js";

const about = {
	init() {
		this.spawns = [];
	},
	async dispatch(event) {
		let Self = about,
			spawn,
			ns, app,
			xApp,
			xPath,
			el;
		// console.log(event);
		switch (event.type) {
			case "window.closed":
			case "spawn.open":
				break;
			case "spawn.close":
				let index = Self.spawns.indexOf(event.spawn.id);
				Self.spawns.splice(index, 1);
				if (!Self.spawns.length) window.close();
				break;
			case "show-defiant":
				spawn = window.open("about-defiant");
				// save reference to spawn
				Self.spawns.push(spawn.id);

				Self.dispatch({ type: "about-defiant", spawn });
				break;
			case "about-defiant":
			case "defiant-storage":
			case "defiant-eula":
			case "defiant-privacy-policy":
				spawn = event.spawn;
				el = window.render({
					template: event.type,
					match: `//*`,
					target: spawn.find(".win-body_ content"),
				});
				// resize window body
				spawn.find(".win-body_").css({ height: el.height() });
				// special handling - markdown content
				if (event.type === "defiant-privacy-policy") {
					// fetch license, if not already fetched
					Self.pp = Self.pp || await window.fetch("~/help/privacy-policy.md");
					let htm = window.marked(Self.pp);
					spawn.find(".pp-text").html(htm);
				}
				return true;
			case "show-app":
				spawn = window.open("about-app");
				spawn.el.data({ nsApp: `${event.ns}:${event.app}` });
				Self.dispatch({ type: "about-app", spawn });
				break;
			case "about-app":
				spawn = event.spawn;
				[ns, app] = spawn.el.data("nsApp").split(":");
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
				// make sure app icons is in ledger
				await defiant.message({ type: "load-app-icon", ns, id: app });
				// render overview content
				el = window.render({
					template: "about-app",
					changePath: `//xsl:variable[@name="app"]`,
					changeSelect: `//Settings/Apps/i[@ns="${ns}"][@id="${app}"]`,
					target: spawn.find(".win-body_ content"),
				});
				// resize window body
				spawn.find(".win-body_").css({ height: el.height() });

				return true;
			case "app-license":
				spawn = event.spawn;
				[ns, app] = spawn.el.data("nsApp").split(":");
				
				// render view
				el = window.render({
					template: "app-license",
					match: `sys://Settings/Apps/i[@ns="${ns}"][@id="${app}"]`,
					target: spawn.find(".win-body_ content"),
				});

				// fetch license, if not already fetched
				Self.License = Self.License || await window.fetch(`/app/${ns}/${app}/LICENSE`);

				let text = Self.License,
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
				spawn.find(".win-body_").css({ height: el.height() });
				
				return true;
			// case "app-issues":
			case "app-source-code":
				spawn = event.spawn;
				[ns, app] = spawn.el.data("nsApp").split(":");
				// copy value of "ported" from meta
				xPath = `sys://meta[@name="id"][@value="${app}"]/../meta[@namespace="${ns}"]/../..`;
				xApp = window.bluePrint.selectSingleNode(xPath);

				// fetch app stats, if not already fetched
				let appName = xApp.selectSingleNode(`.//meta[@name="title"]`).getAttribute("value"),
					stat = await defiant.message({ type: "get-app-stat", ns: Self.ns, id: Self.app }),
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
					match: `//*`,
					template: "app-source-code",
					target: spawn.find(".win-body_ content"),
				});
				// resize window
				spawn.find(".win-body_").css({ height: el.height() });
				
				return true;
			case "show-license":
				window.find(".toolbar-tool_[data-click='app-license']").trigger("click");
				break;
		}
	}
};

window.exports = about;
