var contour = require('src/contour');
var styles = require('./dashboard.css');

// FIXME: Should the dashboard be the application's render function?
function Dashboard(applicationName, ring) {
    function render(h) {
        // TODO: use perso.classe for color?
        return contour.frame(h, contour.Purple, [
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
