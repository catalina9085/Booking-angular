import {Component, input, model, signal} from '@angular/core';
import { MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule,} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatRadioChange,MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {Filter} from '../domain/filter.model';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-filter',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    MatSelect,
    MatRadioModule,
    MatOption,
    MatInputModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filter=model<Filter|null>(new Filter());
  amenities=input<string[]>([]);

  amenitiesChanged(selected: string[]) {
    this.filter.update(current => {
      if (current === null) return null;

      return {
        ...current,
        amenities: selected
      };
    });

  }

  dateChanged(event: any) {
    this.filter.update(current => {
      if (current === null) return null;
      return {
        ...current,
        date:event.toLocaleDateString('sv-SE')
      };
    });
  }
  availabilityChanged(event: MatRadioChange) {
    this.filter.update(current => {
      if (current === null) return null;

      return {
        ...current,
        available: event.value
      };
    });
  }
  resetFilters() {
    this.filter.set(null);
  }

}
