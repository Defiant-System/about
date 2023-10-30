
let Test = {
	init(APP, spawn) {
		
		return;
		setTimeout(() => spawn.find(`.toolbar-tool_[data-click="karaqu-eula"]`).trigger("click"), 300);
		// setTimeout(() => spawn.find(`.toolbar-tool_[data-click="app-source-code"]`).trigger("click"), 300);
				
		// return setTimeout(() => APP.dispatch({ type: "toggle-ruler", spawn }), 500);
		// return setTimeout(() => APP.dispatch({ type: "tab.new", spawn }), 500);
	}
};
