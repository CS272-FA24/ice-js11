
const NAME_REGEX = /[a-zA-Z ]+/;
const EMAIL_REGEX = /^[a-zA-Z0-9-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;

let numEmail = 0;
let emailNodes = [];

/**
 * Called whenever the "Add Email" button is pressed.
 * Adds the given email to the DOM, as well as a button
 * to remove itself from the DOM.
 */
function addEmailToDOM() {
    const emailInputsNode = document.getElementById("email-inputs");

    const newDivNode = document.createElement("div");
    newDivNode.id = `email-div-${numEmail}`;
    newDivNode.className = "mb-2"

    const newLabelNode = document.createElement("label");
    newLabelNode.innerText = 'Please enter your email...';
    newLabelNode.for = `email-input-${numEmail}`;

    const newInnerDivNode = document.createElement("div");
    newInnerDivNode.style.display = "flex"

    const newInputNode = document.createElement("input");
    newInputNode.id = `email-input-${numEmail}`;
    newInputNode.className = 'form-control mb-2';
    newInputNode.placeholder = 'Type your email here...';
    newInputNode.style.maxWidth = '25em';

    const newRemoveButtonNode = document.createElement("button");
    newRemoveButtonNode.className = 'btn btn-danger ms-2';
    newRemoveButtonNode.style.height = "fit-content";
    newRemoveButtonNode.innerText = 'Remove';
    newRemoveButtonNode.addEventListener("click", () => {
        const isSure = confirm("Are you sure you want to delete this email?");
        if (isSure) {
            emailNodes = emailNodes.filter(currNode => currNode.id !== newDivNode.id);
            document.getElementById("email-inputs").removeChild(newDivNode);
        }
    })

    const newErrorTextNode = document.createElement("p");
    newErrorTextNode.id = `email-error-text-${numEmail}`;
    newErrorTextNode.style.color = "red";

    newInnerDivNode.appendChild(newInputNode);
    newInnerDivNode.appendChild(newRemoveButtonNode);

    newDivNode.appendChild(newLabelNode);
    newDivNode.appendChild(newInnerDivNode);
    newDivNode.appendChild(newErrorTextNode);
    
    emailInputsNode.appendChild(newDivNode);

    emailNodes.push(newDivNode);
    numEmail++;
}

/**
 * Called whenever the "Validate" button is pressed.
 * Checks whether the given name and email(s) are valid.
 * If they are invalid, it will set the error text elements.
 * Otherwise, it will reset the error text elements.
 */
function validate() {
    let wasFormValid = true;

    // Perform name validation
    wasFormValid = wasFormValid && validateInput(NAME_REGEX, "pii-name", "pii-name-error-text", "Please enter a valid name!");

    // Perform email validation
    wasFormValid = wasFormValid && emailNodes.every(node => {
        const inpId = getInputIdEmailNode(node);
        const errTxtId = getErrorTextIdEmailNode(node);
        let wasValid = validateInput(EMAIL_REGEX, inpId, errTxtId, "This email address is invalid!");
        return wasValid;
    });

    // Require at least 1 email address.
    wasFormValid = wasFormValid && emailNodes.length > 0;
    
    if (wasFormValid) {
        alert("Success!");
    } else {
        alert("Please check your form again.");
    }
}

/**
 * This function will validate a particular input given a regular
 * expression and set or reset any error text that may exist.
 * The function returns the result of its finding.
 * 
 * @param {RegExp} regex validation regex
 * @param {string} inputId id of the input element
 * @param {string} errTxtId id of the error text element
 * @param {string} errText text to display if invalid
 * @returns {boolean} true if input is valid, false otherwise
 */
function validateInput(regex, inputId, errTxtId, errText) {
    const inputNode = document.getElementById(inputId);
    const errorTextNode = document.getElementById(errTxtId);

    if (regex.test(inputNode.value)) {
        inputNode.className = "form-control";
        errorTextNode.innerText = "";
        return true;
    } else {
        inputNode.className = "form-control is-invalid";
        errorTextNode.innerText = errText;
        return false;
    }
}

/**
 * Gets the value of the input from the given email div
 * @param {HTMLElement} node the specific email div
 * @returns {string} the value of the given input field
 */
function getInputValueFromEmailNode(node) {
    return node.getElementsByTagName("input")[0].value;
}

/**
 * Gets the id of the input from the given email div
 * @param {HTMLElement} node the specific email div
 * @returns {string} the id of the given input field
 */
function getInputIdEmailNode(node) {
    return node.getElementsByTagName("input")[0].id;
}

/**
 * Gets the id of the input from the given email div
 * @param {HTMLElement} node the specific email div
 * @returns {string} the id of the given input field
 */
function getErrorTextIdEmailNode(node) {
    return node.getElementsByTagName("p")[0].id;
}
