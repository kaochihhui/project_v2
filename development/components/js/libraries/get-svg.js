import $ from "jquery";
import * as d3 from "d3";
import * as d3_queue from "d3-queue";

import svg_fix from './fix-svg-size';



var call_svg = function(options) {
  var tags;
  var todo;

  if (options) {
    var q = d3_queue.queue();
    if (options.todo) {
      if (typeof options.todo === "function") {
        todo = options.todo;
      }
    }
    if (options.urls) {
      if ($.isArray(options.urls)) {
        options.urls.forEach(d => {
          q.defer(d3.xml, d);
        });
        q.awaitAll(get_xml);
      }
    }
    if (options.tags) {
      if ($.isArray(options.tags)) {
        tags = options.tags;
      }
    }
  }

  function get_xml(error, xmls) {
    if (error) throw error;
    if (navigator.appName === 'Microsoft Internet Explorer') {
      xmls.forEach((xml, i) => {
        var svg = cloneToDoc(xml.documentElement);
        if (tags[i] !== undefined) {
          d3.select(tags[i]).node().appendChild(svg);
          svg_fix({
            tag: tags[i]
          });
        }
      });
    } else {
      xmls.forEach((xml, i) => {
        var svg = document.importNode(xml.documentElement, true);
        if (tags[i] !== undefined) {
          d3.select(tags[i]).node().appendChild(svg);
          svg_fix({
            tag: tags[i]
          });
        }
      });
    }
    todo(xmls);
  }

};


var cloneToDoc = function(node, doc) {
  if (!doc) doc = document;
  var clone = doc.createElementNS(node.namespaceURI, node.nodeName);
  for (var i = 0, len = node.attributes.length; i < len; ++i) {
    var a = node.attributes[i];
    if (/^xmlns\b/.test(a.nodeName)) continue; // IE can't create these
    clone.setAttributeNS(a.namespaceURI, a.nodeName, a.nodeValue);
  }
  for (var ii = 0, len2 = node.childNodes.length; ii < len2; ++ii) {
    var c = node.childNodes[ii];
    clone.insertBefore(
      c.nodeType == 1 ? cloneToDoc(c, doc) : doc.createTextNode(c.nodeValue),
      null
    );
  }
  return clone;
};

module.exports = call_svg;
