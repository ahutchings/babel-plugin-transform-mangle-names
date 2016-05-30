const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Generates variable names by walking the `LETTERS`. If all letters are used
 * then it starts from the beginning and increments a counter to make names
 * like: `a`, `A`, `a1`.
 * @param  {Object} scope the scope to check for other bindings
 * @return {string}       the new name
 */
function generateVariableName(scope) {
  let uid;
  let i = 0;
  let extra = '';
  do {
    if (i === LETTERS.length) {
      i = 0;
      extra++;
    }
    uid = `${LETTERS[i]}${extra}`;
    i++;
  } while (scope.hasBinding(uid) || scope.hasGlobal(uid) || scope.hasReference(uid));

  return uid;
}

/**
 * Renames an identifier with a unique short name
 * @param  {Scope} scope
 * @param  {string} previousName
 */
function rename(scope, previousName) {
  if(previousName.length > 1) {
    const nextName = generateVariableName(scope);
    if(nextName.length < previousName.length) {
      scope.rename(previousName, nextName);
    }
  }
}

export default function({ types: t }) {

  function renameArrayPatternIdentifiers(scope, node) {
    node.elements.forEach(element => {
      if(t.isIdentifier(element)) {
        rename(scope, element.name);
      } else if (t.isRestElement(element)) {
        rename(scope, element.argument.name);
      } else if (t.isAssignmentPattern(element)) {
        renameAssignmentIdentifier(scope, element);
      }
    });
  }

  function renameAssignmentIdentifier(scope, node) {
    rename(scope, node.left.name);
  }

  return {
    visitor: {
      /**
       * Works on different types of function nodes to shorten parameter names.
       *
       * @example
       * //Arrow functions:
       * var arrowFunc = (long1, long2) => {…} // var arrowFunc = (a, b) => {…}
       *
       * //Function expressions:
       * var func = function(long1, long2) {…} // var func = function(a, b) => {…}
       *
       * // Class methods
       * class Test {
       *   constructor(long1, long2) {…}       // constructor(a, b) {…}
       *   doSomething(long3, long 4) {…}      // doSomething(a, b) {…}
       * }
       *
       * // Function declarations
       * function myFunc(long1, long2) {…}     // function myFunc(a, b) {…}
       */
      ['ArrowFunctionExpression|ClassMethod|FunctionDeclaration|FunctionExpression']({ node, scope }) {
        node.params.forEach(paramNode => {
          if (t.isIdentifier(paramNode)) {
            rename(scope, paramNode.name);
          } else if (t.isArrayPattern(paramNode)) {
            renameArrayPatternIdentifiers(scope, paramNode);
          } else if (t.isAssignmentPattern(paramNode)) {
            renameAssignmentIdentifier(scope, paramNode);
          }
        });
      },
      /**
       * Works on `VariableDeclarator` nodes to shorten their names.
       *
       * var myFunc = function() {…}
       * var myFunc2 = () => {…}

       * For now function expressions like above do not have the variable name
       * changed as it will interfere with `function.name`. The Babel plugin,
       * `babel-plugin-transform-es2015-function-name` will change functions
       * like that to:
       *
       * var myFunc = function myFunc() {…}
       *
       * so we could detect that at some point and change the variable name
       * and leave the function name.
       */
      VariableDeclarator({ node, scope }) {
        if (!t.isFunctionExpression(node.init) && !t.isArrowFunctionExpression(node.init)) {
          // No point trying to shorten names of one character);
          if (t.isIdentifier(node.id)) {
            rename(scope, node.id.name);
          } else if (t.isArrayPattern(node.id)) {
            renameArrayPatternIdentifiers(scope, node.id);
          }
        }
      }
    }
  };
}
