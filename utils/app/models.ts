import { AIModel } from "@/types/llmModel";

export const filterOpenAIModels = (models: AIModel[]) => {
    const filteredModels = models.filter((model: AIModel) => {
        return model.category != 'OpenAI';
      });


      return filteredModels;
}

export const saveModels = (models: AIModel[]) => {
    localStorage.setItem('models', JSON.stringify(models));
  };
  