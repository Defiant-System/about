
const about = {
	init() {
		// fast references
		this.els = {
			content:  window.find("content"),
		};

		// temp
		setTimeout(() => {
			window.find(".toolbar-tool_[data-click='app-license']").trigger("click");
		}, 500);
	},
	dispatch(event) {
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
				/*
				xApp = window.bluePrint.selectSingleNode(`sys://Application[.//meta/@name="id" and .//meta/@value="${event.app}"]`);
				name = xApp.selectSingleNode(".//meta[@name='id']").getAttribute("value");
				namespace = xApp.selectSingleNode(".//meta[@name='author']").getAttribute("namespace");
				Self.els.icon.css({"background-image": `url(/app/${namespace}/icons/app-icon-${name}.png)`});

				node = xApp.selectSingleNode(".//meta[@name='title']");
				Self.els.name.html(node.getAttribute("value"));
				Self.els.version.html(node.getAttribute("version"));

				node = xApp.selectSingleNode(".//meta[@name='author']");
				Self.els.author.html(node.getAttribute("value"));

				let size = xApp.xml.replace(/ {4}/g, "").length;
				Self.els.size.html(defiant.formatBytes(size, 1));

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

				// el.find(".license-text").html(``);

				height = el.height() +"px";
				window.body.css({ height });
				return true;
		}
	}
};

window.exports = about;
