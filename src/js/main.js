
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
			node;
		
		//console.log(event);
		switch (event.type) {
			case "show-about":
				node = event.node.selectSingleNode(".//meta[@name='id']");
				Self.els.icon.css({ "background-image": `url(ant/icons/app-icon-${node.getAttribute("value")}.png)` });

				node = event.node.selectSingleNode(".//meta[@name='title']");
				Self.els.name.html(node.getAttribute("value"));
				Self.els.version.html(node.getAttribute("version"));

				node = event.node.selectSingleNode(".//meta[@name='author']");
				Self.els.author.html(node.getAttribute("value"));

				// Self.els.size.html();
				// Self.els.modified.html();
				
				node = event.node.selectSingleNode(".//meta[@name='license']");
				Self.els.license.html(node.getAttribute("value"));
				break;
		}
	}
};

window.exports = about;
