
defiant.require("./modules/marked.min.js");

const about = {
	init() {
		// fast references
		this.els = {
			content:  window.find("content"),
		};

		// temp
		// setTimeout(() => {
		// 	window.find(".toolbar-tool_[data-click='app-license']").trigger("click");
		// }, 500);
	},
	async dispatch(event) {
		let Self = about,
			app,
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
				el = window.render({
					template: event.type,
					match: `//*`,
					target: Self.els.content,
				});

				height = el.height() +"px";
				window.body.css({ height });
				return true;
			// About app
			case "about-app":
				Self.app = Self.app || event.app;

				el = window.render({
					template: "about-app",
					match: `sys://Application[.//meta/@name="id"][.//meta/@value="${Self.app}"]`,
					target: Self.els.content,
				});

				height = el.height() +"px";
				window.body.css({ height });

				let xApp = window.bluePrint.selectSingleNode(`sys://Application[.//meta/@name="id" and .//meta/@value="${Self.app}"]`);
				let size = xApp.xml.replace(/ {4}/g, "").length;
				Self.els.content.find(".size").html(defiant.formatBytes(size, 1));
				/*
				name = xApp.selectSingleNode(".//meta[@name='id']").getAttribute("value");
				namespace = xApp.selectSingleNode(".//meta[@name='author']").getAttribute("namespace");
				Self.els.icon.css({"background-image": `url(/app/${namespace}/icons/app-icon-${name}.png)`});

				node = xApp.selectSingleNode(".//meta[@name='title']");
				Self.els.name.html(node.getAttribute("value"));
				Self.els.version.html(node.getAttribute("version"));

				node = xApp.selectSingleNode(".//meta[@name='author']");
				Self.els.author.html(node.getAttribute("value"));


				let date = new Date(+xApp.getAttribute("mDate"));
				Self.els.modified.html(date.toISOString().slice(0, 10));
				
				node = xApp.selectSingleNode(".//meta[@name='license']");
				Self.els.license.html(node.getAttribute("value"));
				*/
				return true;
			case "app-license":
			case "app-issues":
			case "app-source-code":
				el = window.render({
					template: event.type,
					match: `//*`,
					target: Self.els.content,
				});

				if (event.type === "app-license") {
					let text = await window.fetch("~/license.md"),
						name = text.match(/^# .+$/gm)[0],
						version = text.match(/^version .+$/gmi)[0];
					// update header
					el.find("h2").html(`${name.slice(2)}<span>${version}</span>`);
					// clear header from 
					text = text.replace(name, "");
					text = text.replace(version, "");

					let htm = window.marked(text);
					el.find(".license-text").html(htm);
				}

				height = el.height() +"px";
				window.body.css({ height });
				return true;
		}
	}
};

window.exports = about;
