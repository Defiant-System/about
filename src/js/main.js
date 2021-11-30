
@import "./modules/marked.min.js";

const about = {
	init() {
		// fast references
		this.els = {
			content:  window.find("content"),
		};

		// temp
		// this.dispatch({ type: "about-defiant" });
		// setTimeout(() => {
		// 	// window.find(".toolbar-tool_[data-click='app-source-code']").trigger("mousedown").trigger("click");
		// 	window.find(".toolbar-tool_[data-click='defiant-privacy-policy']").trigger("mousedown").trigger("click");
		// }, 500);
	},
	async dispatch(event) {
		let Self = about,
			template = event.type,
			target = Self.els.content,
			match = `//*`,
			xApp,
			xPath,
			height,
			el;
		
		//console.log(event);
		switch (event.type) {
			// About Defiant
			case "about-defiant":
				// alter toolbar
				window.find(".toolbar-group_").addClass("about-defiant");
				/* falls through */
			case "defiant-storage":
			case "defiant-eula":
			case "defiant-privacy-policy":
				el = window.render({ template, match, target });
				// resize window
				window.body.css({ height: el.height() });

				if (event.type === "defiant-privacy-policy") {
					// fetch license, if not already fetched
					Self.pp = Self.pp || await window.fetch("~/help/privacy-policy.md");
					let htm = window.marked(Self.pp);
					el.find(".pp-text").html(htm);
				}

				return true;
			// About app
			case "about-app":
				Self.ns = Self.ns || event.ns;
				Self.app = Self.app || event.app;

				// copy value of "ported" from meta
				xPath = `sys://meta[@name="id"][@value="${Self.app}"]/../meta[@namespace="${Self.ns}"]/../..`;
				xApp = window.bluePrint.selectSingleNode(xPath);
				if (xApp) {
					xPath = `sys://Settings/Apps/i[@ns="${Self.ns}"][@id="${Self.app}"]`;
					let sApp = window.bluePrint.selectSingleNode(xPath),
						xPorted = xApp.selectSingleNode(".//meta[@ported]");
					if (xPorted && !sApp.getAttribute("ported")) {
						sApp.setAttribute("ported", xPorted.getAttribute("ported"));
					}
				}

				// make sure app icons is in ledger
				await defiant.message({ type: "load-app-icon", ns: Self.ns, id: Self.app });

				let changePath = `//xsl:variable[@name="app"]`,
					changeSelect = `//Settings/Apps/i[@ns="${Self.ns}"][@id="${Self.app}"]`;
				// render overview content
				el = window.render({ template, changePath, changeSelect, target });

				// resize window
				window.body.css({ height: el.height() });

				return true;
			case "app-license":
				// render view
				match = `sys://Settings/Apps/i[@ns="${Self.ns}"][@id="${Self.app}"]`;
				el = window.render({ template, match, target });

				// fetch license, if not already fetched
				Self.License = Self.License || await window.fetch(`/app/${Self.ns}/${Self.app}/LICENSE`);

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
				window.body.css({ height: el.height() });

				return true;
			// case "app-issues":
			case "app-source-code":
				// copy value of "ported" from meta
				xPath = `sys://meta[@name="id"][@value="${Self.app}"]/../meta[@namespace="${Self.ns}"]/../..`;
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
				el = window.render({ template, match, target });
				// resize window
				window.body.css({ height: el.height() });

				return true;
			case "show-license":
				window.find(".toolbar-tool_[data-click='app-license']").trigger("click");
				break;
		}
	}
};

window.exports = about;
