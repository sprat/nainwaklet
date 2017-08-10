var Contour = require('src/contour');
var styles = require('./dashboard.css');

// FIXME: Should the dashboard be the application's render function?
function Dashboard(applicationName, ring) {
    function render(h) {
        var contour = Contour(h, Contour.Mutant);
        return contour.frame([
            contour.darkTop(),
            contour.darkBlock(applicationName),
            contour.darkToLight(),
            contour.lightBlock(ring ? ring.render(h) : ''),
            contour.lightBottom()
        ], styles.dashboard);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
