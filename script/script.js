const outputField = document.getElementById("output");
const inputField = document.getElementById("input");
const globaleState = {
  operator: undefined,
  firstParam: undefined,
  secondParem: undefined,
  isFloat: false,
};

function reset() {
  globaleState.operator = undefined;
  globaleState.firstParam = undefined;
  globaleState.secondParem = undefined;
  globaleState.isFloat = false;
}

let allClearButton = document.querySelector(".clear");
allClearButton.addEventListener("click", () => {
  inputField.textContent = "$";
  outputField.textContent = "0";
  reset();
});

/*-------------------*/
function displayThing(event) {
  const lastChar = inputField.textContent.charAt(
    inputField.textContent.length - 1
  );
  if (lastChar === "$") inputField.textContent = event.target.textContent;
  else inputField.textContent += event.target.textContent;
}

function operatorThing(event) {
  let currentContent = inputField.textContent;
  let lastChar = currentContent.charAt(currentContent.length - 1);
  if (
    lastChar === "$" ||
    lastChar === "+" ||
    lastChar === "-" ||
    lastChar === "x" ||
    lastChar === "/"
  )
    return;
  if (globaleState.firstParam === undefined) {
    if (globaleState.isFloat) {
      globaleState.firstParam = parseFloat(currentContent);
      globaleState.isFloat = false;
    } else globaleState.firstParam = parseInt(currentContent);
    inputField.textContent += event.target.textContent;
  } else {
    if (globaleState.isFloat) {
      globaleState.secondParem = parseFloat(
        inputField.textContent.substring(
          inputField.textContent.indexOf(globaleState.operator) + 1,
          inputField.textContent.length
        )
      );
      globaleState.isFloat = false;
    } else {
      globaleState.secondParem = parseInt(
        inputField.textContent.substring(
          inputField.textContent.indexOf(globaleState.operator) + 1,
          inputField.textContent.length
        )
      );
    }
    let result = evaluate();

    if (!Number.isFinite(result)) {
      reset();
      outputField.textContent = "Error";
      inputField.textContent += "$";
      return;
    }
    let fixedResult = result;
    if (!Number.isInteger(result)) {
      fixedResult = result.toFixed(2);
      globaleState.isFloat = true;
    }
    globaleState.firstParam = result;
    outputField.textContent = fixedResult.toString();
    inputField.textContent = `${result}${event.target.textContent}`;
  }
  globaleState.operator = event.target.textContent;
  console.log(globaleState);
}

function equalThing() {
  let lastChar = inputField.textContent.charAt(
    inputField.textContent.length - 1
  );
  if (
    lastChar === "$" ||
    lastChar === "+" ||
    lastChar === "-" ||
    lastChar === "x" ||
    lastChar === "/"
  )
    return;
  if (globaleState.firstParam === undefined) {
    if (globaleState.isFloat) {
      outputField.textContent = parseFloat(inputField.textContent);
      globaleState.isFloat = false;
    } else outputField.textContent = parseInt(inputField.textContent);
  } else {
    if (globaleState.isFloat) {
      globaleState.secondParem = parseFloat(
        inputField.textContent.substring(
          inputField.textContent.indexOf(globaleState.operator) + 1,
          inputField.textContent.length
        )
      );
      globaleState.isFloat = false;
    } else {
      globaleState.secondParem = parseInt(
        inputField.textContent.substring(
          inputField.textContent.indexOf(globaleState.operator) + 1,
          inputField.textContent.length
        )
      );
    }
    let result = evaluate();
    if (!Number.isInteger(result)) {
      result = result.toFixed(2);
    }
    reset();
    outputField.textContent = result.toString();
  }
  inputField.textContent += "$";
}

function deleteThing() {
  let currentContent = inputField.textContent;
  if (
    Number.isInteger(
      parseInt(currentContent.charAt(currentContent.length - 1))
    ) ||
    currentContent.charAt(currentContent.length - 1) === "."
  ) {
    inputField.textContent =
      currentContent.length >= 2
        ? currentContent.substring(0, currentContent.length - 1)
        : "$";
  } else if (currentContent.charAt(currentContent.length - 1) === "$") {
    inputField.textContent = "$";
  } else {
    reset();
    inputField.textContent =
      currentContent.length >= 2
        ? currentContent.substring(0, currentContent.length - 1)
        : "$";
  }
}

function pointThing(event) {
  let lastChar = inputField.textContent.charAt(
    inputField.textContent.length - 1
  );
  if (!globaleState.isFloat) {
    if (Number.isInteger(parseInt(lastChar))) {
      inputField.textContent += ".";
      globaleState.isFloat = true;
    } else return;
  } else return;
}
/*-------------------*/

/*-------------------*/
const displayButtons = document.querySelectorAll(".number");
[...displayButtons].forEach((e) => {
  e.addEventListener("click", displayThing);
});
let operatorButtons = document.querySelectorAll(".operator");
[...operatorButtons].forEach((button) => {
  button.addEventListener("click", operatorThing);
});
let equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", equalThing);
let delButton = document.querySelector(".delete");
delButton.addEventListener("click", deleteThing);
let pointButton = document.querySelector(".point");
pointButton.addEventListener("click", pointThing);
/*-------------------*/

function evaluate() {
  if (globaleState.operator === "+")
    return globaleState.firstParam + globaleState.secondParem;
  if (globaleState.operator === "-")
    return globaleState.firstParam - globaleState.secondParem;
  if (globaleState.operator === "x")
    return globaleState.firstParam * globaleState.secondParem;
  if (globaleState.operator === "/") {
    return globaleState.firstParam / globaleState.secondParem;
  }
}
