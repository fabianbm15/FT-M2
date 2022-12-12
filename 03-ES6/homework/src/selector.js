var traverseDomAndCollectElements = function (matchFunc, startEl) {
  // (e) => `#${e.id}` === selector
  var resultSet = [];

  if (typeof startEl === "undefined") {
    // document.body.children[1]
    startEl = document.body; // el inicio de nuestro recorrido del DOM es por el body
  }
  if (matchFunc(startEl)) resultSet.push(startEl)
  for (let i = 0; i < startEl.children.length; i++) {
    let result = traverseDomAndCollectElements(matchFunc, startEl.children[i])
    resultSet = [...resultSet, ...result]
  }

  // matchFunc (startEl )-> true/false   -> document.body -> traverseDomAndCollectElements(document.body.children[0]

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // ("#pagatitle")
  // tu código aquí
  if ("#" === selector[0]) return "id";
  if ("." === selector[0]) return "class";
  for (let i = 1; i < selector.length; i++) {
    if ("." === selector[i]) return "tag.class";
  }
  return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector); // ("#pagatitle") -> "id"
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (e) => `#${e.id}` === selector;
  } else if (selectorType === "class") {
    // class="dede lele las"  class="lele"
    matchFunction = (e) => {
      for (let i = 0; i < e.classList.length; i++) {
        // selector (".momo")
        if (`.${e.classList[i]}` === selector) return true;
      }
      return false;
    };
  } else if (selectorType === "tag.class") {
    // ("div.nono");
    // const [a,b] = [{f},{v}]    a = {f}
    matchFunction = (e) => {
      let [tag, c] = selector.split("."); // -> ["div", "nono"]
      let function_tag = matchFunctionMaker(tag); // -> (e)=> e.tagName === selector.toUpperCase()
      let function_class = matchFunctionMaker("." + c);
      return function_tag(e) && function_class(e); // ->  true && false -> false
    };
  } else if (selectorType === "tag") {
    matchFunction = (e) => e.tagName === selector.toUpperCase(); // "DIV"  === "DIV"
  }
  return matchFunction; // matchFunction será una function   ( )-> true/false
};

var $ = function (selector) { // $('#pagetitle')
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector); //  matchFunction = (e) => `#${e.id}` === selector;
  elements = traverseDomAndCollectElements( selectorMatchFunc);
  return elements;
};

/*
 $('#pagetitle') -> [{}]
​
 $('body') -> [{}{}{}{}]
​
​
  selectorTypeMatcher('.image');
    expect(type).toEqual("class");
​
    #
    "id"
​
*/