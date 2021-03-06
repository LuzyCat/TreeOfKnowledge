
document.getElementById('add').onclick = function() {addNode()};
document.getElementById('remove').onclick = function() {removeSelected()};
document.getElementById('selected').onclick = function() {seeSelected()};


function addNode(){
	cy.add({group: "nodes", data: {id:"new"}, position:{x:300, y:300}});
}
function removeSelected(){
	if (selected != null){
		cy.remove(selected);
	}
}
function seeSelected(){
	console.log(selected.data())
}


var cy = cytoscape({
	container: document.getElementById('cy'),
	elements: [ // list of graph elements to start with
		{ // node a
			data: { id: 'a', type:'type1' }
		},
		{ // node b
			data: { id: 'b', type:'type2' }
		},
		{ // edge ab
			data: { id: 'ab', source: 'a', target: 'b' }
		}
	],
	style: [ // the stylesheet for the graph
	    {
			selector: 'node[type="type1"]',
			style: {
				'width': 'label',
				'height': 30,
				'background-color': '#080',
				'border-width': 2,
				'border-style': 'solid',
				'border-color': 'black',
				'padding': '10px',
				'label': 'data(type)'
			}
	    },
	    {
			selector: 'node[type="type2"]',
			style: {
				'width': '60',
				'height': '60',
				'shape': 'pentagon',
				'background-color': '#080',
				'border-width': 2,
				'border-style': 'solid',
				'border-color': 'black',
				'label': 'data(id)'
			}
	    },
		{
			selector: 'edge',
			style: {
				'width': 5,
				'curve-style': 'haystack',
				'haystack-radius': 0.5,
				'line-color': '#852',
				'line-style': 'dashed',
				'target-arrow-color': '#0f0',
				'target-arrow-shape': 'triangle',
				'source-label': 'source',
				'source-text-offset': '50',
				'overlay-color':'blue'
			}
		},
		{
			selector: 'core',
			style:{
				'active-bg-color': 'blue'
			}
		}
	],

	layout: {
	    name: 'grid',
	    rows: 1
  	},

	// initial viewport state:
	zoom: 1,
	pan: { x: 0, y: 0 },

  	// interaction options:
	minZoom: 1e-1,
	maxZoom: 1e1,
	zoomingEnabled: true,
	userZoomingEnabled: true,
	panningEnabled: true,
	userPanningEnabled: true,
	boxSelectionEnabled: false,
	selectionType: 'single',
	touchTapThreshold: 8,
	desktopTapThreshold: 4,
	autolock: false,
	autoungrabify: false,
	autounselectify: false,

	// rendering options:
	headless: false,
	styleEnabled: true,
	hideEdgesOnViewport: false,
	hideLabelsOnViewport: false,
	textureOnViewport: false,
	motionBlur: false,
	motionBlurOpacity: 0.2,
	wheelSensitivity: 1,
	pixelRatio: 'auto'

});

cy.add({
	group: "nodes",
	data: {id: 'baby', weight:75},
	position: {x:200, y:200}
})

var eles = cy.add([
	{ group: "nodes", data: { id: "n0" }, position: { x: 100, y: 100 } },
	{ group: "nodes", data: { id: "n1" }, position: { x: 200, y: 200 } },
	{ group: "edges", data: { id: "e0", source: "n0", target: "n1" } }
]);

var j = cy.$('#j')
var collection = cy.elements("node[weight>50]");
cy.remove(collection);

var collection = cy.collection();


var selected = null;

cy.on('tap', 'node', function(evt){
	var node = evt.target;
	console.log(node.id() + ' selected');
	selected = node;
});

cy.on('tap', function(event){
	var evtTarget = event.target;
	if (evtTarget == cy) {
		console.log('background tap')
	} else {
		console.log('tap on some element')
	}
});

cy.$('#a').qtip({
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  position: {
    my: 'top center',
    at: 'bottom center'
  },
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 16,
      height: 8
    }
  }
});

cy.contextMenus({
	menuItems: [
	    {
	        id: 'remove',
	        content: 'remove',
	        tooltipText: 'remove',
	        image: {src : "remove.svg", width : 12, height : 12, x : 6, y : 4},
	        selector: 'node, edge',
	        onClickFunction: function (event) {
	          var target = event.target || event.cyTarget;
	          target.remove();
	        },
	        hasTrailingDivider: true
		},
		{
	        id: 'hide',
	        content: 'hide',
	        tooltipText: 'hide',
	        selector: '*',
	        onClickFunction: function (event) {
	          var target = event.target || event.cyTarget;
	          target.hide();
	        },
	        disabled: false
		},
		{
	        id: 'add-node',
	        content: 'add node',
	        tooltipText: 'add node',
	        image: {src : "add.svg", width : 12, height : 12, x : 6, y : 4},
	        coreAsWell: true,
	        onClickFunction: function (event) {
	          var data = {
	              group: 'nodes'
	          };
	          
	          var pos = event.position || event.cyPosition;
	          
	          cy.add({
	              data: data,
	              position: {
	                  x: pos.x,
	                  y: pos.y
	              }
	          });
	        }
	      },
	      {
	        id: 'remove-selected',
	        content: 'remove selected',
	        tooltipText: 'remove selected',
	        image: {src : "remove.svg", width : 12, height : 12, x : 6, y : 6},
	        coreAsWell: true,
	        onClickFunction: function (event) {
	          cy.$(':selected').remove();
	        }
	      },
	      {
	        id: 'select-all-nodes',
	        content: 'select all nodes',
	        tooltipText: 'select all nodes',
	        selector: 'node',
	        onClickFunction: function (event) {
	          selectAllOfTheSameType(event.target || event.cyTarget);
	        }
	      },
	      {
	        id: 'select-all-edges',
	        content: 'select all edges',
	        tooltipText: 'select all edges',
	        selector: 'edge',
	        onClickFunction: function (event) {
	          selectAllOfTheSameType(event.target || event.cyTarget);
	        }
	    }
	]
});