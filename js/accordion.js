define([
//'jquery'
],
function(){
	var AccordionModule = function(options){
		this.options = options;
		if(typeof options.autoInit === 'undefined' || options.autoInit === true || options.autoInit === 'true')
			this.init();
	};
	AccordionModule.prototype = {
		init: function(){
			var self = this,
				options = this.options;
			this.accordionId =  options.accordionId ? options.accordionElement : $('#accordion');
			this.closedWidth = options.tabWidth ? options.tabWidth : $('.accordion-tab', this.accordionId)[0].clientWidth;
			this.activePanelIndex = options.initialPanel ? options.initialPanel : 0;
			this.panels = $('.accordion-panel', this.accordionId);
			this.activePanel = this.panels[this.activePanelIndex] ? this.panels[this.activePanelIndex] : this.panels[0];
			this.openWidth = parseInt($(this.activePanel).addClass('open').css('width'));
			this.beforeOpenCallback = options.beforeOpenCallback ? options.beforeOpenCallback : null;
			this.afterOpenCallback = options.afterOpenCallback ? options.afterOpenCallback : null;
			self._initClicks();
		},
		getAllPanels: function(){
			var self = this;
			return self.panels;
		},
		getPanel: function(index){
			var self = this;
			if(self.panels[index])
				return self.panels[index];
			else
				console.log("getPanel: index out of bounds error. index: ", index);
				return false;
		},
		getActivePanel: function(){
			var self = this;
			return self.activePanel;
		},
		getActivePanelIndex: function(){
			var self = this;
			return $(self.activePanel).index();
		},
		next: function(){
			var self = this;
				activePanelIndex = self.getActivePanelIndex();

			if(activePanelIndex + 1 < self.panels.length )
				self._openPanel(self.panels[activePanelIndex + 1]);
			else
				self._openPanel(self.panels[0]);
		},
		previous: function(){
			var self = this;
				activePanelIndex = self.getActivePanelIndex();

			if(activePanelIndex > 0 )
				self._openPanel(self.panels[activePanelIndex - 1]);
			else
				self._openPanel(self.panels[self.panels.length-1]);
		},
		openPanel: function(index){
			var self = this;
			if(self.panels[index])
				self._openPanel(self.panels[index]);
			else
				console.log("openPanel: index out of bounds error. index: ", index);
		},
		_setActivePanel: function(panel){
			var self = this;
			self.activePanel = panel;
		},
		_initClicks: function(){
			var self = this;
			self.panels.on('click', function(evt){
				var panel = this;
				self._openPanel(panel);
			});
		},
		_openPanel: function(panel){
			var self = this,
				activePanel = self.getActivePanel();

			if(panel != activePanel){
				self._beforeOpen();

				$(activePanel).stop().animate({
					width: self.closedWidth + 'px'
				}, {duration: 300, complete: function(){
					$(this).removeClass('open');	
				}});

				$(panel).stop().animate({
					width: self.openWidth + 'px'
				}, {duration: 300, complete: function(){
					$(this).addClass('open');	
				}});

				self._setActivePanel(panel);

				self._afterOpen();
			}
		},
		_beforeOpen: function(){
			var self = this;
			if(typeof self.beforeOpenCallback === 'function')
				self.beforeOpenCallback(self);
		},
		_afterOpen: function(){
			var self = this;
			if(typeof self.afterOpenCallback === 'function')
				self.afterOpenCallback(self);
		}

	};

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
	/* Utility Functions 
		init() //manually initialize accordion, must be used if autoInit is set to false
		getAllPanels() //returns all panels
		getPanel(index) //returns panel with specified index, if index is out of bounds an error is thrown
		getActivePanel() //returns current active panel;
		getActivePanelIndex() //returns index of active panel
		next() //switches to next panel
		previous() //switches to previous panel
		openPanel(index) //switches to panel with specified index, if index is out of bounds an error is thrown
	*/
	return accordion;
});