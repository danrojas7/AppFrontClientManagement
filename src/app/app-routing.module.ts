import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageClientComponent } from './manage-client/manage-client.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ErrorComponent } from './error/error.component';

const APP_ROUTES: Routes = [
    // { path: '', component: ManageClientComponent },
    { path: '', pathMatch: 'full', redirectTo: 'client-management' },
    { path: 'client-management', component: ManageClientComponent },
    { path: 'client-look-history', component: ComingSoonComponent },
    { path: 'emergency-pin-config', component: ComingSoonComponent },
    { path: 'emergency-pin-history', component: ComingSoonComponent },
    { path: '**', component: ErrorComponent }
]

export const appRoutingProviders: any[] = [];
export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);