import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PromptComponent } from './prompt/prompt.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        PagenotfoundComponent,
        ConfirmDialogComponent,
        PromptComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        PromptComponent
    ],
    imports: [
        CommonModule,
        MatBadgeModule,
        ReactiveFormsModule,
        RouterModule,
        MatSidenavModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatButtonModule
    ]
})
export class SharedModule { }
