
defiant.require("./modules/marked.min.js");

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
		// }, 500);
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
				Self.app = Self.app || event.app;

				match = `sys://Application[.//meta/@name="id"][.//meta/@value="${Self.app}"]`;
				xApp = window.bluePrint.selectSingleNode(match);
				el = window.render({ match, template, target });

				// calculate application size
				let size = xApp.xml.replace(/ {4}/g, "").length;
				Self.els.content.find(".size").html(defiant.formatBytes(size, 1));

				height = el.height() +"px";
				window.body.css({ height });

				return true;
			case "app-license":
				// render view
				match = `sys://Application[.//meta/@name="id"][.//meta/@value="${Self.app}"]`;
				xApp = window.bluePrint.selectSingleNode(match);
				el = window.render({ template, match, target });

				// fetch license, if not already fetched
				let ns = xApp.selectSingleNode(`.//meta[@name="author"]`).getAttribute("namespace");
				Self.License = Self.License || await window.fetch(`/app/${ns}/${Self.app}/LICENSE`);

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
