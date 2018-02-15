/**
 * signalr module
 */
import { NgModule } from '@angular/core';

import { SignalRModule } from '@dharapvj/ngx-signalr';
import { SignalRConfiguration } from '@dharapvj/ngx-signalr';


export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'Ng2SignalRHub';
  c.qs = { user: 'donald' };
  c.url = 'http://ng2-signalr-backend.azurewebsites.net/';
  c.logging = true;
  // c.executeEventsInZone = true; // optional, default is true
  // c.executeErrorsInZone = false; // optional, default is false
  // c.executeStatusChangeInZone = true; // optional, default is true
  console.log('signal r configs=', c);
  return c;
}

@NgModule({
  imports: [
    SignalRModule.forRoot(createConfig)
  ]
})
export class SignalrCustomModule {}
