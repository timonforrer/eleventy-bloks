import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://3e921892764a47b7a750b3192ea512da@o1014425.ingest.sentry.io/5979627',
  integration:[new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
});
