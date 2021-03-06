(function (nx, global) {

	var topologyData = {
		nodes: [
			{"id": 0, "x": 410, "y": 100, "name": "12K-1"},
			{"id": 1, "x": 410, "y": 280, "name": "12K-2"},
			{"id": 2, "x": 660, "y": 280, "name": "Of-9k-03"},
			{"id": 3, "x": 660, "y": 100, "name": "Of-9k-02"},
			{"id": 4, "x": 180, "y": 190, "name": "Of-9k-01"}
		],
		links: [
			{"source": 0, "target": 1, id: 0},
			{"source": 0, "target": 1, id: 1},
			{"source": 1, "target": 0, id: 2},
			{"source": 1, "target": 2, id: 3},
			{"source": 1, "target": 3, id: 4},
			{"source": 4, "target": 1, id: 5},
			{"source": 4, "target": 1, id: 6},
			{"source": 2, "target": 3, id: 7},
			{"source": 2, "target": 3, id: 8},
			{"source": 2, "target": 0, id: 9},
			{"source": 0, "target": 4, id: 10},
			{"source": 0, "target": 4, id: 11},
			{"source": 0, "target": 3, id: 12},
			{"source": 0, "target": 1, id: 13},
		]
	};
	var colorTable = ['#C3A5E4', '#75C6EF', '#CBDA5C', '#ACAEB1 ', '#2CC86F'];

	nx.define('Path.SourceNode', nx.ui.Component, {
		view: {
			content: [
				{
					tag: "button",
					content: "Reverse",
					props: {

					},
					events: {
						click: "{#_reverse}"
					}
				},
				{
					name: 'topo',
					type: 'nx.graphic.Topology',
					props: {
						width: 800,
						height: 800,
						nodeConfig: {
							label: 'model.name'
						},
						showIcon: true,
						data: topologyData
					},
					events: {
						'topologyGenerated': '{#_draw}'
					}
				}
			]
		},
		properties: {
			isReversed: false,
			pathInst: {}
		},
		methods: {

			_reverse: function(sender){
				var topo = this.view("topo");
				var pathLayer = topo.getLayer("paths");

				if(this.pathInst()){
					pathLayer.removePath(this.pathInst());
					this.pathInst({});
				}

				this.isReversed(!this.isReversed());
				console.log(this.isReversed());

				this._draw(sender);
			},

			_draw: function (sender, events) {

				var topo = this.view("topo");

				var pathLayer = topo.getLayer("paths");
				var links1 = [topo.getLink(2)];
				var sourceNode = (this.isReversed()) ? links1[0].model().target() : links1[0].model().source();

				this.pathInst(new nx.graphic.Topology.Path({
					sourceNode: sourceNode,
					links: links1,
					arrow: 'cap',
					pathColor: "#ff0000"
				}));

				pathLayer.addPath(this.pathInst());
			}

		}
	});

})(nx, nx.global);