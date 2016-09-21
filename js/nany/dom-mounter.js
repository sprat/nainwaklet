var maquette = require('maquette');
var h = maquette.h;

function DOMMounter() {
    // create a maquette projector for the rendering
    var projector = maquette.createProjector();

    // refresh all the components mounted by this mounter
    function refresh() {
        projector.scheduleRender();
    }

    // mount a component into a parent DOM node: it will be added at the end of children list
    function mountInto(parentNode, component) {
        function renderRoot() {
            return component.render(h);
        }

        // unmount the component, but it does not restore the original node
        function unmount() {
            projector.detach(renderRoot);
        }

        projector.append(parentNode, renderRoot);

        return unmount;
    }

    return {
        mountInto: mountInto,
        refresh: refresh
    };
}

module.exports = DOMMounter;

