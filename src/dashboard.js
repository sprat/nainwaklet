var contour = require('src/contour');
var styles = require('./dashboard.css');

// FIXME: Should the dashboard be the application's render function?
function Dashboard(applicationName, ring, context) {
    function render(h) {
        var color = (context.perso) ? context.perso.classe : contour.Purple;
        return contour.frame(h, color, [
            contour.darkTop(h),
            contour.darkBlock(h, applicationName),
            contour.darkToLight(h),
            contour.lightBlock(h, ring ? ring.render(h) : ''),
            contour.lightBottom(h)
        ], styles.dashboard);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
