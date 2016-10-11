var Button = require('./button');
var styles = require('./tooltip-button.css');

/* TooltipButton */
function TooltipButton(label, content) {
    var button = Button(label);

    function render(h) {
        var rendered = content.render(h);

        // check if there's something to display, otherwise don't render anything
        if (!rendered) {
            return;
        }

        var contentWrapper = h('div', { class: styles.tooltipContent }, rendered);
        return h('div', { class: styles.tooltip }, [button.render(h), contentWrapper]);
    }

    return {
        render: render
    };
}

module.exports = TooltipButton;
