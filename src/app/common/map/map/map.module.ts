import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';

import { AgmCoreModule } from '@agm/core';
import { MapService } from '../map.service';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDVUOmJcZ1aSfIyvalXcJymL1vKshh-gKk'
    })
  ],
  declarations: [
    MapComponent
  ],
  exports: [MapComponent],
  providers: [MapService]
})
export class MapModule { }
