chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        prompt: `Create detailed imperssionstic style sketch art to depict chaos in a village that is burning.`,
        totalGeneration: 2,
        isRunning: false
    })
})
