/*!
 * Nainy Application & Library
 * https://github.com/sprat/nany
 *
 * Copyright 2015 by Sylvain Prat
 * Released under the MIT licence.
 */
var nany_user, nany_nainwak_urls, nany_nainwak_nain, utils_assert, utils_array, nany_nainwak_pages, utils_url, utils_extend, utils_html, nany_nainwak_page, utils_regexp, nany_nainwak_detect, nany_nainwak_main, nany_nainwak, utils_log, nany_spy, nany_dashboard, nany_application, nany_nanylet, utils_unset, utils_css, nany_main, nany;
nany_user = function () {
  function generateRandomGuestName() {
    var id = Math.round(Math.random() * 1000);
    return 'guest' + id;
  }
  /* User class */
  function User(name, image) {
    return Object.freeze({
      name: name || generateRandomGuestName(),
      image: image
    });
  }
  return User;
}();
nany_nainwak_urls = function () {
  var origin = 'http://www.nainwak.com';
  function gameUrl(page) {
    return origin + '/jeu/' + (page || 'index') + '.php';
  }
  function imageUrl(path) {
    return origin + '/images/' + path;
  }
  /* Check if we are in the Nainwak game page */
  function isInGame(window) {
    var loc = window.location, pageUrl = loc.origin + loc.pathname;
    return pageUrl === gameUrl();
  }
  return {
    gameUrl: gameUrl,
    imageUrl: imageUrl,
    isInGame: isInGame
  };
}();
nany_nainwak_nain = function (urls) {
  /* Get the Nainwak User info from the menu frame */
  function get(window) {
    if (!urls.isInGame(window)) {
      return;
    }
    var frame = window.frames.menu, doc = frame.document, title = doc.querySelector('.news-titre'), name = title.querySelector('td:last-child').innerHTML, image = title.querySelector('td:first-child img').src;
    return {
      nom: name,
      image: image
    };
  }
  return { get: get };
}(nany_nainwak_urls);
utils_assert = function () {
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }
  return assert;
}();
utils_array = function (assert) {
  function decodeEntities(string) {
    // TODO: not really efficient, a regex-based implementation would be better
    var txt = document.createElement('textarea');
    txt.innerHTML = string;
    return txt.value;
  }
  // parses a string containing a representation of a Javascript array
  // with JSON-compatible values and returns it
  function parse(string) {
    var cleaned = string.replace(/([\[,]\s*)'(.*)'(\s*[,\]])/g, function (ignore, before, inside, after) {
        var escaped = inside.replace(/"/g, '\\"');
        // escape double-quotes inside
        return before + '"' + escaped + '"' + after;  // wrap in double-quotes
      }), values = JSON.parse(cleaned);
    return values.map(function (value) {
      return decodeEntities(value);
    });
  }
  // similar to Array.prototype.find which is only available in ES6
  function find(array, predicate) {
    var length = array.length, i, element;
    for (i = 0; i < length; i += 1) {
      element = array[i];
      if (predicate(element)) {
        return element;
      }
    }
  }
  // convert an array of keys and an array of values to an object
  function toObject(keys, values) {
    assert(keys.length === values.length, 'should have the same length');
    var obj = {};
    keys.forEach(function (key, i) {
      obj[key] = values[i];
    });
    return obj;
  }
  return {
    parse: parse,
    find: find,
    toObject: toObject
  };
}(utils_assert);
nany_nainwak_pages = function (array) {
  function Pages(pages) {
    function byUrl(url) {
      return array.find(pages, function (page) {
        return page.url === url;
      });
    }
    function byName(name) {
      return array.find(pages, function (page) {
        return page.name === name;
      });
    }
    return Object.freeze({
      list: pages,
      byName: byName,
      byUrl: byUrl
    });
  }
  return Pages;
}(utils_array);
utils_url = function () {
  function parse(url, document) {
    var doc = document || window.document, a = doc.createElement('a');
    a.href = url;
    return a;
  }
  function normalize(url, document) {
    return parse(url, document).href;
  }
  function buildQueryParams(params) {
    var pairs = [];
    Object.keys(params).forEach(function (key) {
      var value = params[key], encodedKey = encodeURIComponent(key), encodedValue = encodeURIComponent(value);
      pairs.push(encodedKey + '=' + encodedValue);
    });
    return pairs.join('&');
  }
  return {
    parse: parse,
    normalize: normalize,
    buildQueryParams: buildQueryParams
  };
}();
utils_extend = function () {
  function extend(target) {
    var sources = Array.prototype.slice.call(arguments, 1);
    sources.forEach(function (source) {
      if (source) {
        Object.keys(source).forEach(function (prop) {
          target[prop] = source[prop];
        });
      }
    });
    return target;
  }
  return extend;
}();
utils_html = function (extend) {
  var tags = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'command',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'eventsource',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'mark',
    'map',
    'menu',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'pre',
    'progress',
    'q',
    'ruby',
    'rp',
    'rt',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr'
  ];
  function parseDocument(html) {
    // The HTML parsing is not supported on all the browsers, maybe we
    // should use a polyfill?
    var parser = new DOMParser();
    return parser.parseFromString(html, 'text/html');
  }
  function load(url, processResponse) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    // async
    xhr.responseType = 'document';
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // response received and loaded
        processResponse({
          status: xhr.status,
          document: xhr.response
        });
      }
    };
    xhr.send(null);
  }
  function renderer(document) {
    var h = {};
    function text(str) {
      return document.createTextNode(str);
    }
    function element(name, children, options) {
      var el = document.createElement(name);
      // append the children
      if (children) {
        if (!Array.isArray(children)) {
          children = [children];
        }
        children.forEach(function (child) {
          if (typeof child === 'string' || child instanceof String) {
            child = text(child);
          }
          el.appendChild(child);
        });
      }
      // add the options
      extend(el, options);
      return el;
    }
    h.text = text;
    tags.forEach(function (name) {
      h[name] = element.bind(null, name);
    });
    return h;
  }
  return {
    parseDocument: parseDocument,
    load: load,
    renderer: renderer
  };
}(utils_extend);
nany_nainwak_page = function (urls, url, html, extend) {
  function Page(name, analyze, loadParams) {
    var baseUrl = urls.gameUrl(name);
    function getUrl(IDS) {
      var params = { IDS: IDS };
      if (loadParams) {
        extend(params, loadParams);
      }
      return baseUrl + '?' + url.buildQueryParams(params);
    }
    function load(IDS, processResult) {
      var fullUrl = getUrl(IDS);
      html.load(fullUrl, function (response) {
        var result = null;
        if (response.status === 200) {
          result = analyze(response.document);
        }
        processResult(result);
      });
    }
    return Object.freeze({
      name: name,
      url: baseUrl,
      // base URL without query parameters
      analyze: analyze,
      load: load
    });
  }
  return Page;
}(nany_nainwak_urls, utils_url, utils_html, utils_extend);
utils_regexp = function (assert) {
  function getAllMatches(regex, text) {
    assert(regex && regex.exec && regex.test, 'not a RegExp object');
    var matches = [], addNextMatch = function () {
        var match = regex.exec(text);
        if (match !== null) {
          matches.push(match);
          return true;
        }
        return false;
      }, found;
    if (regex.global) {
      do {
        found = addNextMatch();
      } while (found);
    } else {
      addNextMatch();
    }
    return matches;
  }
  return { getAllMatches: getAllMatches };
}(utils_assert);
nany_nainwak_detect = function (Page, urls, array, regexp) {
  function int(value) {
    return parseInt(value, 10);
  }
  function findLocalisation(doc) {
    // example:
    // <span class="c1">Position (13,5) sur "Ronain Graou" |b95eb2f716c500db6|</span>
    var el = doc.getElementsByClassName('c1')[0], text = el.textContent, regex = /Position\s\((\d+),(\d+)\)\ssur\s"([^"]*)"/i, match = regex.exec(text);
    if (match) {
      return {
        position: [
          int(match[1]),
          int(match[2])
        ],
        monde: match[3]
      };
    }
  }
  function getAllScriptsSource(doc) {
    var sources = Array.prototype.map.call(doc.scripts, function (script) {
      return script.src ? '' : script.innerHTML;
    });
    return sources.join('\n');
  }
  function processScriptArrays(doc, regex, keys, createObject) {
    var text = getAllScriptsSource(doc), matches = regexp.getAllMatches(regex, text);
    return matches.map(function (match) {
      var values = array.parse(match[1]), spec = array.toObject(keys, values);
      return createObject(spec);
    });
  }
  function parseTag(tag) {
    var regex = /<span\s+style=\"color:(#[0-9A-F]{6});\">([^<]*)<\/span>/i, match = regex.exec(tag);
    if (match) {
      return {
        nom: match[2],
        couleur: match[1]
      };
    }
  }
  function findNains(doc) {
    var regex = /tabavat\[\d+\]\s=\s(\[.*\]);/gi, keys = 'id,photo,nom,tag,barbe,classe,cote,distance,x,y,description,attaquer,gifler,estCible';
    function getCote(classe) {
      switch (classe) {
      case 0:
        return 'nain-déci';
      case 1:
        return 'brave';
      case 2:
        return 'sadique';
      case 3:
        return 'rampant';
      case 7:
        return 'mutant';
      default:
        return 'unknown';
      }
    }
    return processScriptArrays(doc, regex, keys.split(','), function (spec) {
      // TODO: extract more info: tag perso
      // [Perso][Guilde] or [Guilde][Perso] or [PersoGuilde] or [GuildePerso]
      var nain = {
          id: int(spec.id),
          nom: spec.nom,
          image: urls.imageUrl(spec.photo),
          description: spec.description,
          position: [
            int(spec.x),
            int(spec.y)
          ],
          cote: getCote(int(spec.classe)),
          rang: spec.cote,
          barbe: int(spec.barbe) / 100
        }, tag = parseTag(spec.tag);
      if (tag) {
        nain.guilde = tag;
      }
      return nain;
    });
  }
  function findObjets(doc) {
    var regex = /tabobjet\[\d+\]\s=\s(\[.*\]);/gi, keys = 'id,photo,nom,distance,x,y,categorie,poussiere';
    return processScriptArrays(doc, regex, keys.split(','), function (spec) {
      return {
        id: int(spec.id),
        nom: spec.nom,
        image: urls.imageUrl(spec.photo),
        categorie: spec.categorie.toLowerCase(),
        position: [
          int(spec.x),
          int(spec.y)
        ],
        poussiere: int(spec.poussiere)  // expressed in seconds
      };
    });
  }
  function analyze(doc) {
    var localisation = findLocalisation(doc), nains = findNains(doc), objets = findObjets(doc);
    return {
      monde: localisation.monde,
      position: localisation.position,
      nains: nains,
      objets: objets
    };
  }
  return Page('detect', analyze, {});
}(nany_nainwak_page, nany_nainwak_urls, utils_array, utils_regexp);
nany_nainwak_main = function (urls, nain, Pages, detect) {
  /*
  // Evénements (tous types d'evts sur 10 jours)
  Page('even', log, {duree: 240, type: 'ALL'}),
  // Fiche de perso
  Page('perso', log),
  // Inventaire
  Page('invent', log),
  // Encyclopédie
  Page('encyclo', log)
  */
  var pages = Pages([detect]);
  return {
    gameUrl: urls.gameUrl,
    imageUrl: urls.imageUrl,
    isInGame: urls.isInGame,
    getNain: nain.get,
    pages: pages
  };
}(nany_nainwak_urls, nany_nainwak_nain, nany_nainwak_pages, nany_nainwak_detect);
nany_nainwak = function (main) {
  return main;
}(nany_nainwak_main);
utils_log = function () {
  var console = window.console, bind = Function.prototype.bind;
  if (console && console.log && bind) {
    return bind.call(console.log, console);
  }
  return function noLog() {
    return;
  };
}();
nany_spy = function (nainwak, log) {
  /* Spy class */
  function Spy(conf) {
    var frame = conf.infoFrame,
      //IDS = url.parseQueryParams(frame.location).IDS,
      infoLoaded = function () {
        var contentWindow = frame.contentWindow, doc = contentWindow.document, location = contentWindow.location, url = location.origin + location.pathname, page = nainwak.pages.byUrl(url), result;
        log('Navigation to ' + url);
        if (page) {
          // TODO: do something useful with the result
          log('Analyzing ' + page.name);
          result = page.analyze(doc);
          log(result);
        }
      }, isEnabled = false, enable = function (value) {
        var oldEnabled = isEnabled;
        // update the status (and convert to boolean, just in case)
        isEnabled = !!value;
        if (oldEnabled === isEnabled) {
          // nothing to do
          return;
        }
        // register or unregister the load event handler
        if (isEnabled) {
          frame.addEventListener('load', infoLoaded, false);
        } else {
          frame.removeEventListener('load', infoLoaded, false);
        }
      };
    // start enabled
    enable(true);
    return Object.freeze({
      get enabled() {
        return isEnabled;
      },
      set enabled(value) {
        enable(value);
      }
    });
  }
  return Spy;
}(nany_nainwak, utils_log);
nany_dashboard = function (html) {
  /* Dashboard class */
  function Dashboard(conf) {
    var container = conf.container,
      //user = conf.user,
      containerContent = null,
      // initial content of the container
      ui = function () {
        var h = html.renderer(document), title = h.div('Nany ' + conf.channel, { className: 'VNT title' }), content = h.div('Chargement en cours...', { className: 'TV content' });
        return h.div([
          title,
          content
        ], { className: 'nany' });
      }(), isEnabled = false, enable = function (value) {
        var oldEnabled = isEnabled;
        // update the status (and convert to boolean, just in case)
        isEnabled = !!value;
        if (isEnabled === oldEnabled) {
          // nothing to do
          return;
        }
        if (isEnabled) {
          // backup the initial content
          containerContent = container.innerHTML;
          // replace by our UI
          container.innerHTML = '';
          container.appendChild(ui);
        } else {
          // restore the initial content
          container.innerHTML = containerContent;
          containerContent = null;
        }
      };
    // start enabled
    enable(true);
    return Object.freeze({
      get enabled() {
        return isEnabled;
      },
      set enabled(value) {
        enable(value);
      }
    });
  }
  return Dashboard;
}(utils_html);
nany_application = function (Spy, Dashboard, User, extend) {
  function getElement(target) {
    if (target === undefined || target === null) {
      return target;
    }
    if (target.nodeType !== undefined) {
      return target;  // it's already a node
    }
    // so, we assume it's a selector
    return window.document.querySelector(target);
  }
  /* Application class */
  function Application(conf) {
    var dashboard, spy, newConf = {
        // default conf
        user: User(),
        // anonymous user
        channel: 'default',
        // default channel
        container: window.document.body,
        // dashboard container
        infoFrame: undefined  // info frame
      };
    extend(newConf, conf);
    newConf.container = getElement(newConf.container);
    newConf.infoFrame = getElement(newConf.infoFrame);
    if (newConf.container) {
      dashboard = Dashboard(newConf);
    }
    if (newConf.infoFrame) {
      spy = Spy(newConf);
    }
    function destroy() {
      if (spy) {
        spy.enabled = false;
      }
      if (dashboard) {
        dashboard.enabled = false;
      }
    }
    return Object.freeze({
      user: newConf.user,
      channel: newConf.channel,
      dashboard: dashboard,
      spy: spy,
      destroy: destroy
    });
  }
  return Application;
}(nany_spy, nany_dashboard, nany_user, utils_extend);
nany_nanylet = function (nainwak) {
  function generateHref(scriptUrl, channel) {
    var lines = [
      'javascript:(function () {',
      'var w = window,',
      '    l = w.location,',
      '    u = l.origin + l.pathname,',
      '    d = document,',
      '    b = d.body,',
      '    n = "nany",',
      '    i = n + "Script",',
      '    s = d.getElementById(i);',
      'if (u === "' + nainwak.gameUrl() + '") {',
      '    if (s) b.removeChild(s);',
      '    s = d.createElement("script");',
      '    s.id = i;',
      '    s.type = "text/javascript";',
      '    s.src = "' + scriptUrl + '";',
      '    s.async = false;',
      '    s.setAttribute("data-channel", "' + channel + '");',
      '    b.appendChild(s);',
      '} else {',
      '    alert("Erreur : ce script ne fonctionne que dans la partie jeu de Nainwak !");',
      '}',
      '}())'
    ];
    return lines.join('\n').replace(/\s+/g, ' ');
  }
  return { generateHref: generateHref };
}(nany_nainwak);
utils_unset = function () {
  function unset(obj, key) {
    try {
      delete obj[key];
    } catch (e) {
      obj[key] = undefined;
    }
  }
  return unset;
}();
utils_css = function (array, urlUtils) {
  function findHead(document) {
    var doc = document || window.document;
    return doc.getElementsByTagName('head')[0];
  }
  function findLink(url, document) {
    var href = urlUtils.normalize(url, document), links = findHead(document).getElementsByTagName('link');
    return array.find(links, function (link) {
      return link.href === href;
    });
  }
  function createLink(url, document) {
    var doc = document || window.document, link = doc.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', url);
    return link;
  }
  function insertLink(url, document) {
    // check if there's already a link with this url in the document
    var link = findLink(url, document);
    if (link) {
      return;
    }
    // otherwise, create and return it
    link = createLink(url, document);
    findHead(document).appendChild(link);
    return link;
  }
  return {
    createLink: createLink,
    insertLink: insertLink
  };
}(utils_array, utils_url);
nany_main = function (User, Application, nanylet, nainwak, assert, unset, css, url) {
  var scripts = document.scripts, script = scripts[scripts.length - 1], scriptUrl = script && script.src ? script.src : getScriptUrlWithRequire(), cssUrl = scriptUrl.replace(/\bjs\b/g, 'css'),
    // replace 'js' by 'css'
    channel = script.getAttribute('data-channel') || 'default';
  function getScriptUrlWithRequire() {
    var relativeUrl = require.toUrl('nany.min.js');
    return url.normalize(relativeUrl);
  }
  /* Initialize the bookmarklets buttons */
  function initializeNanylets(selector) {
    var buttons = document.querySelectorAll(selector || '.nanylet');
    Array.prototype.forEach.call(buttons, function (button) {
      var channel = button.getAttribute('data-channel'), href = nanylet.generateHref(scriptUrl, channel);
      button.setAttribute('href', href);
    });
  }
  function startApplicationOnNainwak(name, window) {
    var frames = window.frames, pubDoc = frames.pub.document, infoFrame = frames.info.frameElement, nain = nainwak.getNain(window);
    // insert the CSS file if needed (we never remove it!)
    css.insertLink(cssUrl, pubDoc);
    // create the Hub and assign it to the external api
    window[name] = Application({
      user: User(nain.nom, nain.image),
      channel: channel,
      container: pubDoc.body,
      infoFrame: infoFrame
    });
  }
  // toggle the Application on the Nainwak game page
  function runOnNainwak(window) {
    var name = 'nanyApplication',
      // global app name
      app = window[name];
    if (!nainwak.isInGame(window)) {
      return;
    }
    // if the application is already launched, kill it
    if (app) {
      app.destroy();
      unset(window, name);
      return;
    }
    // start the application
    startApplicationOnNainwak(name, window);
  }
  runOnNainwak(window);
  return Object.freeze({
    initializeNanylets: initializeNanylets,
    User: User,
    Application: Application
  });
}(nany_user, nany_application, nany_nanylet, nany_nainwak, utils_assert, utils_unset, utils_css, utils_url);
nany = function (main) {
  return main;
}(nany_main);
window.nany = nany;
//# sourceMappingURL=nany.js.map