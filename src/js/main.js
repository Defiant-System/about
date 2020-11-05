
const about = {
	init() {
		// fast references
		this.els = {
			content:  window.find("content"),
		};

		// let now = new Date();
		// window.find(".year").html(now.getFullYear());
	},
	dispatch(event) {
		let Self = about,
			xApp,
			namespace,
			name,
			node;
		
		//console.log(event);
		switch (event.type) {
			case "about-defiant":
				// alter toolbar
				window.find(".toolbar-group_").addClass("about-defiant");

				window.render({
					template: "about-defiant",
					match: `//*`,
					target: Self.els.content,
				});
				break;
			case "about-app":
				window.render({
					template: "about-app",
					match: `//*`,
					target: Self.els.content,
				});
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
				break;
		}
	}
};

window.exports = about;
