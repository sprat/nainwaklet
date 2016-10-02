var maquette = require('maquette');
var dom = require('./dom');

function Mounter() {
    // create a maquette projector for the rendering
    var projector = maquette.createProjector();

    // refresh all the components mounted by this mounter
    function refresh() {
        projector.scheduleRender();
    }

    // method: append / insertBefore / replace / merge
    function mount(method, element, componentOrRender) {
        var node = element.node;
        var h = maquette.h;
        var render = componentOrRender.render || componentOrRender;

        // render the virtual DOM tree
        function renderTree() {
            return render(h, refresh) || h('div.nany-empty');
        }

        // unmount the component (does not restore the original node)
        function unmount() {
            projector.detach(renderTree);
        }

        // add the component to the projector
        projector[method](node, renderTree);

        // return the unmount function
        return unmount;
    }

    // append a component to a parent node
    function append(node, component) {
        return mount('append', dom.Element(node), component);
    }

    // prepend a component to a parent node
    function prepend(node, component) {
        return mount('insertBefore', dom.Element(node).firstChild(), component);
    }

    // replace a node by a component
    function replace(node, component) {
        return mount('replace', dom.Element(node), component);
    }

    return {
        append: append,
        prepend: prepend,
        replace: replace,
        refresh: refresh
    };
}

module.exports = Mounter;
