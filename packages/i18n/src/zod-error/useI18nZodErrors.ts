'use client';

import { useTranslations } from 'use-intl';
import { z } from 'zod';

import { makeZodI18nMap } from './zodErrorMap';

export const useI18nZodErrors = () => {
  const t = useTranslations();
  const tForm = useTranslations('forms');
  const tCustom = useTranslations('forms.errors');
  z.setErrorMap(makeZodI18nMap({ t, tForm, tCustom }));
};
