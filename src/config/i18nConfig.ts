/* eslint-disable @typescript-eslint/no-floating-promises */
import { configureI18n } from '@dynamic-framework/ui-react';

import { LANG } from './widgetConfig';

import es from '../locales/es.json';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
  ar: { translation: ar },
};

configureI18n(resources, { lng: LANG });
