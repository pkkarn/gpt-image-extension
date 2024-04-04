import { DallEDescriptionExecuter } from "./utils/imageGenerationScript";


chrome.storage.local.get(["prompt", "totalGeneration", "isRunning"], async (result) => {
   const { isRunning,  prompt, totalGeneration } = result;
   if(isRunning) {
      let tempCount = totalGeneration;

      console.log(`We\'re running this generation with total no. of generation ${totalGeneration}`)
      await DallEDescriptionExecuter(prompt)
      tempCount-=1

      const intervalChecker = setInterval(async () => {
        if(tempCount > 0) {
          console.log(`Generation No. ${tempCount}`)
          await DallEDescriptionExecuter("Now generate next variation with bit of changes in this same prompt")
        } else {
          console.log('clearing interval')
          clearInterval(intervalChecker)
          chrome.storage.local.set({
            isRunning: false
          })
        }

        tempCount-=1;
      }, 60000)
   }
})