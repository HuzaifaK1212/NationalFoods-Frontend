import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base/src/validate-lic';

registerLicense('Mgo+DSMBaFt/QHFqVVhkVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jTHxVdk1nUH5XdH1XTg==;Mgo+DSMBPh8sVXJ0S0d+XE9AflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31Tc0dlWXdaeXVcQ2VbWA==;ORg4AjUWIQA/Gnt2VVhhQlFacldJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkBhX39WdH1UT2VbUkw=;MjIwOTA0OEAzMjMwMmUzMTJlMzBmSnptNlhDTzhTaU1RdnNaSGN3c3l2V1NJTTFQNll1RWFiRTNjKzlJMWpFPQ==;MjIwOTA0OUAzMjMwMmUzMTJlMzBiOUVHeUMrbjBOOU1xWjIwdStuT0dwTjdydTZURnhMMFVlZ2ZCZXdRbTQ0PQ==;NRAiBiAaIQQuGjN/V0Z+XU9EaFtKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUVmW3leeHBcR2laVEN/;MjIwOTA1MUAzMjMwMmUzMTJlMzBGMEtLY2NxQ3YrR2ZxVmt0WGFFOWdXcFcvZVpGUDQyTHM0MmFMcTFiMk44PQ==;MjIwOTA1MkAzMjMwMmUzMTJlMzBOZkZIekxKbDhxeWJRTUY1SUIwLzZMS0dxQjlYOW5ubVNFMnZNZFltR01ZPQ==;Mgo+DSMBMAY9C3t2VVhhQlFacldJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkBhX39WdH1UT2dVU00=;MjIwOTA1NEAzMjMwMmUzMTJlMzBMZUhQNDFRL3lhUkE5akFsdmNVejJ2SndFc0tzVDVRcHNFOUdkWFo0V1pjPQ==;MjIwOTA1NUAzMjMwMmUzMTJlMzBVdCt6RUNyL0VUUUpuVVNxYUdQK3AzWVV2UFlmbTRKalFWOTRzTWQvOFhzPQ==');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
