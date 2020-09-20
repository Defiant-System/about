
const about = {
	init() {
		// fast references
		this.els = {
			icon:     window.find(".panel-left .icon"),
			name:     window.find(".panel-right h1"),
			version:  window.find(".panel-right h5 span"),
			author:   window.find(".details .author"),
			size:     window.find(".details .size"),
			modified: window.find(".details .modified"),
			license:  window.find(".details .license"),
		};
	},
	dispatch(event) {
		let Self = about,
			xApp,
			node;
		
		//console.log(event);
		switch (event.type) {
			case "window.open":
				xApp = window.bluePrint.selectSingleNode(`sys://Application[.//meta/@name="id" and .//meta/@value="${event.app}"]`);
				node = xApp.selectSingleNode(".//meta[@name='id']");
				Self.els.icon.css({ "background-image": `url(ant/icons/app-icon-${node.getAttribute("value")}.png)` });

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
				break;
		}
	}
};

window.exports = about;
