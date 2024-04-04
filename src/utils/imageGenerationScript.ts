export const DallEDescriptionExecuter = async (prompt: string): Promise<void> => {
    // Select the textarea element by its ID
    var textarea = document.getElementById('prompt-textarea') as HTMLInputElement;

    // Change the value of the textarea
    textarea.value = prompt;

    // Create a new 'input' event
    var event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });

    textarea.dispatchEvent(event)

    // Dispatch the event
    setTimeout(() => {
        (document.querySelector('[data-testid="send-button"]') as HTMLDivElement).click()
    }, 1000)
}

