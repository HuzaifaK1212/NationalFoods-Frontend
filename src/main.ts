import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Mgo+DSMBaFt+QHJqU01hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfR19qSXpWcEVgXnpfcg==;Mgo+DSMBPh8sVXJ1S0R+WlpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jTHxadkFmX39dd3JRRA==;ORg4AjUWIQA/Gnt2VFhiQldPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtRf0VnXHlec3NSQWI=;MjIzNDE4N0AzMjMxMmUzMDJlMzBiWDJWRXZWenVlK3I2aVRYaGRMRmlhU1pDYVhlRVBqQzJRdFNUQVBaYmRvPQ==;MjIzNDE4OEAzMjMxMmUzMDJlMzBBMzJiaVlMeDdMbGhxUlduQ3dXWGdidk1YQXpUbVRIRFZQaitsZzk3RUdzPQ==;NRAiBiAaIQQuGjN/V0d+Xk9CfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5WdExjXXpYcHddQmZe;MjIzNDE5MEAzMjMxMmUzMDJlMzBjTkVvNExObmlxU0QvamVSQmswa0p3MlRCK0FsNXpST1JRSjh4akc2eGFZPQ==;MjIzNDE5MUAzMjMxMmUzMDJlMzBlRjhWMHVQQUYxNU8zZUdWeGk2aFJmSTB0dlZSb0ptSGpMSWxOL3ZhVUlJPQ==;Mgo+DSMBMAY9C3t2VFhiQldPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtRf0VnXHlec31UQ2I=;MjIzNDE5M0AzMjMxMmUzMDJlMzBvVlRuaXBxTjJNSy9aVFJ4U1h6bCtESlFhWTdiU1ZhUVFhdDZLbzFLQVRzPQ==;MjIzNDE5NEAzMjMxMmUzMDJlMzBPdEZQb3Y4T3dpRU1aenlrYnRsVnhRY0tyemdVaDQrQ2srNHdTVUswVHFRPQ==;MjIzNDE5NUAzMjMxMmUzMDJlMzBjTkVvNExObmlxU0QvamVSQmswa0p3MlRCK0FsNXpST1JRSjh4akc2eGFZPQ==');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
