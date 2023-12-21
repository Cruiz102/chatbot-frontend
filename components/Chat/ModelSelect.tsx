import { useState } from 'react';
import { IconExternalLink, IconPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { AIModel } from '@/types/llmModel';
import HomeContext from '@/pages/api/home/home.context';
import LocalModelPopup from './localModelPopup';

export const ModelSelect = () => {
  const { t } = useTranslation('chat');
  const [isLocalModelPopupVisible, setLocalModelPopupVisible] = useState(false);

  const {
    state: { selectedConversation, models, defaultModelId },
    handleUpdateConversation,
    handleAddLocalModel,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'add-local-model') {
      setLocalModelPopupVisible(true);
    } else {
      selectedConversation &&
        handleUpdateConversation(selectedConversation, {
          key: 'model',
          value: models.find((model) => model.id === e.target.value) as AIModel,
        });
    }
  };



  const isDisabled = models.length === 0;

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {t('Model')}
      </label>
      <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
      <select
    className="w-full bg-transparent p-2"
    placeholder={t('Select a model') || ''}
    value={selectedConversation?.model?.id || defaultModelId}
    onChange={handleChange}
    disabled={isDisabled}
  >
  {models.map((model) => (
    <option
      key={model.id}
      value={model.id}
      className="dark:bg-[#343541] dark:text-white"
      // Adding padding to simulate spacing; this is not reliable across browsers
      style={{
        fontFamily: 'monospace',
      }}
    >
      {`${model.name}${' '.repeat(60 - model.name.length)}`}
      <span style={{ color: 'gray' }}>{model.category}</span> {/* Apply gray color to the category text */}
    </option>
  ))}
  {/* Additional option for adding a local model */}
  <option value="add-local-model">{t('Add Local Model')}</option>
</select>


      </div>
      <div className="w-full mt-3 flex justify-between items-center">
        <a
          href="https://platform.openai.com/account/usage"
          target="_blank"
          className="flex items-center"
        >
          <IconExternalLink size={18} className={'inline mr-1'} />
          {t('View Account Usage')}
        </a>
        <button
          onClick={() => setLocalModelPopupVisible(true)}
          className="flex items-center text-neutral-700 dark:text-neutral-400"
        >
          <IconPlus size={18} className={'inline mr-1'} />
          {t('Add Local Model')}
        </button>
      </div>
      {isLocalModelPopupVisible && (
        <LocalModelPopup
          onClose={() => setLocalModelPopupVisible(false)}
          onSubmit={handleAddLocalModel}
        />
      )}
    </div>
  );
};
