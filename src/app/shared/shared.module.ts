import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatBadgeModule } from '@angular/material/badge';
import { SearchComponent } from './pages/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {MatSidenavModule} from '@angular/material/sidenav';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        PagenotfoundComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent    ],
    imports: [
        CommonModule,
        MatBadgeModule,
        ReactiveFormsModule,
        RouterModule, 
        MatSidenavModule,
        MatIconModule
    ]
})
export class SharedModule { }
