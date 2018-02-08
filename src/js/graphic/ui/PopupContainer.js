(function(nx, global) {
    var Container;
    (function() {
        if (nx && nx.ui && !Container) {
            Container = nx.define(nx.ui.Component, {
                view: {
                    props: {
                        'class': 'nx n-popupContainer',
                        style: {
                            'position': 'absolute',
                            'top': '0px',
                            'left': '0px'

                        }
                    }
                }
            });

            /**
             * Popup container
             * @class nx.ui.PopupContainer
             * @static
             */
            nx.define("nx.ui.PopupContainer", {
                static: true,
                properties: {
                    container: {
                        value: function() {
                            return new Container();
                        }
                    }
                },
                methods: {
                    addPopup: function(popup) {
                        this.container().view().dom().appendChild(popup.view().dom());
                    }
                }
            });
        }
    })();


})(nx, nx.global);
