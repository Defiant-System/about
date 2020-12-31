
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
		// 	window.find(".toolbar-tool_[data-click='defiant-storage']").trigger("click");
		// }, 100);
	},
	async dispatch(event) {
		let Self = about,
			template = event.type,
			target = Self.els.content,
			match = `//*`,
			xApp,
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
			case "defiant-support":
				el = window.render({ template, match, target });

				height = el.height() +"px";
				window.body.css({ height });
				return true;
			// About app
			case "about-app":
				Self.ns = Self.ns || event.ns;
				Self.app = Self.app || event.app;

				let changePath = `//xsl:variable[@name="app"]`,
					changeSelect = `//Settings/Apps/i[@ns="${Self.ns}"][@id="${Self.app}"]`;

				// make sure app icons is in ledger
				await defiant.message({ type: "load-app-icon", ns: Self.ns, id: Self.app });

				// render overview content
				el = window.render({ template, changePath, changeSelect, target });

				height = el.height() +"px";
				window.body.css({ height });

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

				height = el.height() +"px";
				window.body.css({ height });

				return true;
			case "app-issues":
			case "app-source-code":
				el = window.render({ template, match, target });

				height = el.height() +"px";
				window.body.css({ height });

				return true;
			case "show-license":
				window.find(".toolbar-tool_[data-click='app-license']").trigger("click");
				break;
		}
	}
};

window.exports = about;
