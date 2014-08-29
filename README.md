horizontal-accordion
====================

Horizontal Accordion -- AMD style


/* SETUP: */
var accordion  = new AccordionModule({
	accordionElement: $('#accordion'), //optional -- default will use $('accordion')
	tabWidth: 40, //optional -- default will use width from css;
	initialPanel: 0, //optional -- index starts at 0; default 0;
	autoInit: true, // default -- true use accordion.init() to initialize manually
	beforeOpenCallback: function(myAaccordion){ //optional -- code to be run before panel is opened
	},
	afterOpenCallback: function(myAccordion){ //optional -- code to be run after panel is open
	}
});
/* Utility Functions */
	init() //manually initialize accordion, must be used if autoInit is set to false
	getAllPanels() //returns all panels
	getPanel(index) //returns panel with specified index, if index is out of bounds an error is thrown
	getActivePanel() //returns current active panel;
	getActivePanelIndex() //returns index of active panel
	next() //switches to next panel
	previous() //switches to previous panel
	openPanel(index) //switches to panel with specified index, if index is out of bounds an error is thrown
