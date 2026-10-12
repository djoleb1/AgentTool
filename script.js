let ticketTemplate = true;
let teamReminderTemplate = false;
let attEscTemplate = false;
let sdChatTemplate = false;

function generateTemplate() {

    if (ticketTemplate) {
        document.querySelector('#template-type').textContent = 'Ticket Template';
        document.querySelector('#template-form').innerHTML = `
            <div class="container">
                <label for="poc">Point of contact (First and Last name):</label>
                <input type="text" id="poc" autocomplete="off">
            </div>

            <div class="container">
                <label for="contact-phone">Site/Contact phone #:</label>
                <input type="text" id="contact-phone" autocomplete="off">
            </div>

            <div class="container">
                <label for="contact-email">Contact Email:</label>
                <input type="text" id="contact-email" autocomplete="off">
            </div>

            <div class="container">
                <label for="site-name">Site name:</label>
                <input type="text" id="site-name" autocomplete="off">
            </div>

            <div class="container">
                <label for="cmc-id">CMC ID:</label>
                <input type="text" id="cmc-id" autocomplete="off">
            </div>

            <div class="container">
                <label for="description-of-issue">Description of the issue:</label>
                <input type="text" id="description-of-issue" autocomplete="off">
            </div>

            <div class="steps">
                <label for="ts-performed">TS Steps performed:</label>
                <textarea name="ts-performed" id="ts-performed" autocomplete="off"></textarea>
            </div>

            <div class="buttons">
                <button id="copy-content-btn" type="submit"> Copy content</button>

                <div class="corrective-btns">
                    <button id="clear-btn">Clear</button>
                    <button id="undo-btn">Undo Clear</button>
                </div>
            </div>`;
    } else if (teamReminderTemplate) {
        document.querySelector('#template-type').textContent = 'Team Reminder Template';
        document.querySelector('#template-form').innerHTML = `
                <div class="container">
                    <label for="tr-site-name">Site name:</label>
                    <input type="text" id="tr-site-name" autocomplete="off">
                </div>

                <div class="container">
                    <label for="tr-case-num">Case number:</label>
                    <input type="text" id="tr-case-num" autocomplete="off">
                </div>

                <div class="container">
                    <label for="tr-cmc">CMC ID:</label>
                    <input type="text" id="tr-cmc" autocomplete="off">
                </div>

                <div class="container">
                    <label for="tr-closing-time">Closing time:</label>
                    <input type="text" id="tr-closing-time" autocomplete="off">
                </div>

                <div class="container">
                    <label for="tr-eod-time">EOD time:</label>
                    <input type="text" id="tr-eod-time" autocomplete="off">
                </div>

                <div class="steps">
                    <label for="tr-next-steps">Next steps:</label>
                    <textarea name="tr-next-steps" id="tr-next-steps" autocomplete="off"></textarea>
                </div>

                <div class="buttons">

                    <button id="copy-content-btn" type="submit">Copy content</button>

                    <div class="corrective-btns">
                        <button id="clear-btn">Clear</button>
                        <button id="undo-btn">Undo Clear</button>
                    </div>
                </div>
        `;
    } else if (attEscTemplate) {
        document.querySelector('#template-type').textContent = 'ATTESC Template';
        document.querySelector('#template-form').innerHTML = `
                <div class="container">
                    <label for="attesc-site-name">Site name:</label>
                    <input type="text" id="attesc-site-name" autocomplete="off">
                </div>

                <div class="container">
                    <label for="attesc-case-num">Case number:</label>
                    <input type="text" id="attesc-case-num" autocomplete="off">
                </div>

                <div class="container">
                    <label for="attesc-cmc">CMC ID:</label>
                    <input type="text" id="attesc-cmc" autocomplete="off">
                </div>

                <div class="container">
                    <label for="attesc-eod-time">EOD time:</label>
                    <input type="text" id="attesc-eod-time" autocomplete="off">
                </div>

                <div class="steps">
                    <label for="attesc-steps">Issue details and TS steps performed:</label>
                    <textarea name="attesc-steps" id="attesc-steps" autocomplete="off"></textarea>
                </div>

                <div class="buttons">

                    <button id="copy-content-btn" type="submit">Copy content</button>

                    <div class="corrective-btns">
                        <button id="clear-btn">Clear</button>
                        <button id="undo-btn">Undo Clear</button>
                    </div>
                </div>
        `;
    } else if (sdChatTemplate) {
        document.querySelector('#template-type').textContent = 'SD Chat Template';
        document.querySelector('#template-form').innerHTML = `
                <div class="container">
                    <label for="sd-site-name">Oracle Site name and/or Site number:</label>
                    <input type="text" id="sd-site-name" autocomplete="off">
                </div>

                <div class="container">
                    <label for="sd-poc-name">Point of contact name:</label>
                    <input type="text" id="sd-poc-name" autocomplete="off">
                </div>

                <div class="container">
                    <label for="sd-poc-num">Point of contact phone number:</label>
                    <input type="text" id="sd-poc-num" autocomplete="off">
                </div>

                <div class="steps">
                    <label for="sd-issue">Issue details:</label>
                    <textarea name="attesc-steps" id="sd-issue" autocomplete="off"></textarea>
                </div>

                <div class="buttons">

                    <button id="copy-content-btn" type="submit">Copy content</button>

                    <div class="corrective-btns">
                        <button id="clear-btn">Clear</button>
                        <button id="undo-btn">Undo Clear</button>
                    </div>
                </div>
        `
    }
}


generateTemplate();

const copyButton = document.getElementById('copy-content-btn');
const clearButton = document.getElementById('clear-btn');
const button = document.getElementById('copy-content-btn');
const undoButton = document.getElementById('undo-btn');

const inputs = document.querySelectorAll('input');
let timerId = null; // Tracks the active timer

// Handle copy content button event

copyButton.addEventListener('click', (e) => {

    e.preventDefault()

    const form = document.querySelector('#template-form')
    console.log(form.innerHTML)

    const elements = document.querySelectorAll('.container')
    console.log(elements)

    elements.forEach((element) => console.log(element.innerText))

    // Fetch values from input fields
    let siteName = document.getElementById('site-name').value;
    let pointOfContact = document.getElementById('poc').value;
    let contactPhone = document.getElementById('contact-phone').value;
    let contactEmail = document.getElementById('contact-email').value;
    let cmcId = document.getElementById('cmc-id').value;
    let issueDescription = document.getElementById('description-of-issue').value;
    let performedSteps = document.getElementById('ts-performed').value;

    // Fetching values from label fields
    const siteLabel = document.querySelector('label[for="site-name"]').textContent;
    const pocLabel = document.querySelector('label[for="poc"]').textContent;
    const phoneLabel = document.querySelector('label[for="contact-phone"]').textContent;
    const emailLabel = document.querySelector('label[for="contact-email"]').textContent;
    const cmcLabel = document.querySelector('label[for="cmc-id"]').textContent;
    const issueLabel = document.querySelector('label[for="description-of-issue"]').textContent;
    const stepsLabel = document.querySelector('label[for="ts-performed"]').textContent;

    fullContent =
        `${siteLabel} ${siteName}\n${pocLabel} ${pointOfContact}\n${phoneLabel} ${contactPhone}\n${emailLabel} ${contactEmail}\n${cmcLabel} ${cmcId}\n${issueLabel} ${issueDescription}\n\n${stepsLabel}\n${performedSteps}`
    console.log(fullContent)

    // This part copies the content to clipboard
    navigator.clipboard.writeText(fullContent);

    // This will handle the Copied! notification on button
    if (timerId) {
        clearTimeout(timerId);
    } else {
        // Save the original text only if a timer isn't already running
        button.dataset.originalText = button.textContent;
    }

    // Change to the temporary text immediately
    button.textContent = 'Copied!';

    // Set a timer to restore the text after 3000 milliseconds (3 seconds)
    timerId = setTimeout(() => {
        button.textContent = button.dataset.originalText;
        timerId = null; // Reset the tracker
    }, 3000);
})


/*

clearButton.addEventListener('click', (e) => {
    e.preventDefault()

    let siteName = document.getElementById('site-name').value;
    localStorage.setItem('siteName', siteName);

    let pointOfContact = document.getElementById('poc').value;
    localStorage.setItem('pointOfContact', pointOfContact);

    let contactPhone = document.getElementById('contact-phone').value;
    localStorage.setItem('contactPhone', contactPhone);

    let contactEmail = document.getElementById('contact-email').value;
    localStorage.setItem('contactEmail', contactEmail);

    let cmcId = document.getElementById('cmc-id').value;
    localStorage.setItem('cmcId', cmcId);

    let issueDescription = document.getElementById('description-of-issue').value;
    localStorage.setItem('issueDescription', issueDescription);

    let performedSteps = document.getElementById('ts-performed').value;
    localStorage.setItem('performedSteps', performedSteps);

    document.getElementById('site-name').value = '';
    document.getElementById('poc').value = '';
    document.getElementById('contact-phone').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('cmc-id').value = '';
    document.getElementById('description-of-issue').value = '';
    document.getElementById('ts-performed').value = '';
})

// event listener for undo-clear btn

undoButton.addEventListener('click', (e) => {

    e.preventDefault()

    if (localStorage.length > 0) {
        document.getElementById('site-name').value = localStorage.getItem('siteName');
        document.getElementById('poc').value = localStorage.getItem('pointOfContact');
        document.getElementById('contact-phone').value = localStorage.getItem('contactPhone');
        document.getElementById('contact-email').value = localStorage.getItem('contactEmail');
        document.getElementById('cmc-id').value = localStorage.getItem('cmcId');
        document.getElementById('description-of-issue').value = localStorage.getItem('issueDescription');
        document.getElementById('ts-performed').value = localStorage.getItem('performedSteps');
        localStorage.clear()
    }
})*/



document.getElementById('ticket-template').addEventListener('click', () => {

    ticketTemplate = true;
    teamReminderTemplate = false;
    attEscTemplate = false;
    sdChatTemplate = false;

    generateTemplate();
});

document.getElementById('tr-template').addEventListener('click', () => {

    ticketTemplate = false;
    teamReminderTemplate = true;
    attEscTemplate = false;
    sdChatTemplate = false;

    generateTemplate();
});

document.getElementById('attesc-template').addEventListener('click', () => {

    ticketTemplate = false;
    teamReminderTemplate = false;
    attEscTemplate = true;
    sdChatTemplate = false;

    generateTemplate();
});

document.getElementById('sd-template').addEventListener('click', () => {

    ticketTemplate = false;
    teamReminderTemplate = false;
    attEscTemplate = false;
    sdChatTemplate = true;

    generateTemplate();
});


// to do: event.currentTarget
// handling template 