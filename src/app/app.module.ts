import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/mainpage/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {WorkplaceMapComponent} from './components/workplace-map/workplace-map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {RequestFormComponent} from './components/request-form/request-form.component';
import {DamagedFormComponent} from './components/damaged-form/damaged-form.component';
import {OpenstaandComponent} from './components/requests/openstaand/openstaand.component';
import {TireWagon} from './components/request-form/tire-wagon/tire-wagon';
import {AdminpageComponent} from './components/adminpage/adminpage.component';
import {UsersoverviewComponent} from './components/adminpage/users/usersoverview/usersoverview.component';
import {UserspageComponent} from './components/adminpage/users/userspage/userspage.component';
import {UserFilterPipe} from './components/adminpage/searchFilters/user-filter.pipe';
import {UsersCreateComponent} from './components/adminpage/users/users-create/users-create.component';
import {EquipmentspageComponent} from './components/adminpage/equipment/equipmentspage/equipmentspage.component';
import {EquipmentsoverviewComponent} from './components/adminpage/equipment/equipmentsoverview/equipmentsoverview.component';
import {EquipmentsCreateComponent} from './components/adminpage/equipment/equipments-create/equipments-create.component';
import {WagonsFilterPipe} from './components/adminpage/searchFilters/wagons-filter.pipe';
import {RequestService} from './services/request/request.service';
import { SystemLogsComponent } from './components/adminpage/system-logs/system-logs.component';
import { MeldingFilterPipe } from './components/adminpage/searchFilters/melding-filter.pipe';
import {RunnerpageComponent} from './components/runnerpage/runnerpage.component';
import {MechanicpageComponent} from './components/mechanicpage/mechanicpage.component';
import {ProductenpageComponent} from './components/runnerpage/producten/productenpage/productenpage.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginAnimationComponent } from './components/global/login-animation/login-animation.component';
import { RunnerAnimationComponent } from './components/global/runner-animation/runner-animation.component';
import { MechanicAnimationComponent } from './components/global/mechanic-animation/mechanic-animation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    SignInComponent,
    WorkplaceMapComponent,
    RequestFormComponent,
    DamagedFormComponent,
    OpenstaandComponent,
    TireWagon,
    AdminpageComponent,
    AdminpageComponent,
    UsersoverviewComponent,
    UserspageComponent,
    UserFilterPipe,
    UsersCreateComponent,
    EquipmentspageComponent,
    EquipmentsoverviewComponent,
    EquipmentsCreateComponent,
    WagonsFilterPipe,
    SystemLogsComponent,
    MeldingFilterPipe,
    RunnerpageComponent,
    MechanicpageComponent,
    ProductenpageComponent,
    LoginAnimationComponent,
    RunnerAnimationComponent,
    MechanicAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule.forRoot(),
    HttpClientModule,
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
