/**
 * This is a conceptual implementation of utilising the query console in MarkLogic. The script here takes documents from the file system and loads them into the database.
 *
 * In MarkLogic each document has a URI which uniquely identifies the document.
 */
declareUpdate();

var xml2json = function xml2json(xml) {
  var obj = {};
  if (xml.nodeType === 1) {
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
      obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) === "undefined") {
          obj[nodeName] = xml2json(item);
        } else {
          if (typeof(obj[nodeName].push) === "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xml2json(item));
        }
      }
    }
  return obj;
};


function insertJSON(path, uriPrefix, cb) {
  uriPrefix = (typeof uriPrefix === 'undefined') ? '' : uriPrefix;
  var content = xdmp.filesystemDirectory(path);
  var contentInJson = xml2json(content);
  var finalArray = contentInJson['dir:entry'];

  finalArray.forEach(function(item) {
    var obj = {};
    var path = item['dir:pathname']['#text'];
    var uri = uriPrefix + '/' + item['dir:filename']['#text'];
    obj.path = path;
    obj.uri = uri;
    cb(obj);
  });
}

function insertBinary(path, uriPrefix, cb) {
    uriPrefix = (typeof uriPrefix === 'undefined') ? '' : uriPrefix;
    var content = xdmp.filesystemDirectory(path);
    var contentInJson = xml2json(content);
    var finalArray = contentInJson['dir:entry'];

    finalArray.forEach(function(item) {
      var obj = {};
      var path = item['dir:pathname']['#text'];
      var uri = uriPrefix + '/' + item['dir:filename']['#text'];
      obj.path = path;
      obj.uri = uri;
      cb(obj);
    });
}

// location of documents
var jsonPath = '/Users/tamaspiros/Desktop/mlu-sw/data/json';
var imagePath = '/Users/tamaspiros/Desktop/mlu-sw/data/image';
// URI prefix, with *slashes* please
var jsonURI = '/character';
var imageURI = '/image';

insertJSON(jsonPath, jsonURI, function(obj) {
  xdmp.documentLoad(obj.path,
    {
      'uri': obj.uri,
      'permissions' : xdmp.defaultPermissions()
    }
  );
});

insertBinary(imagePath, imageURI, function(obj) {
  xdmp.documentLoad(obj.path,
    {
      'uri': obj.uri,
      'permissions' : xdmp.defaultPermissions()
    }
  );
});