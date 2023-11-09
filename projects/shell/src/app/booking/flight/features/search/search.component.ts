import { bookingFeature } from './../../../+state/booking.state';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { patchState, signalState } from '@ngrx/signals';
import { FlightService } from '../../logic/data-access/flight.service';
import { Flight } from '../../logic/model/flight';
import { FlightFilter } from '../../logic/model/flight-filter';
import { FlightFilterComponent } from '../../ui/flight-filter/flight-filter.component';
import { injectBookingFeature } from '../../../+state/booking.state';
import { CardComponent } from '../../ui/card.component';


type LocalState = {
  filter: FlightFilter;
  basket: Record<number, boolean>;
  flights: Flight[];
}


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    FlightFilterComponent,
  ],
  selector: 'app-flight-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  protected bookingFeature = injectBookingFeature();

  protected localState = signalState<LocalState>({
    filter: {
      from: 'Paris',
      to: 'London',
      urgent: false
    },
    basket: {
      3: true,
      5: true,
    },
    flights: []
  });

  search(filter: FlightFilter): void {
    patchState(this.localState, { filter });
    this.bookingFeature.search(filter);
  }

  updateBasketId(id: number, selected: boolean): void {
    patchState(this.localState, state => ({
      basket: {
        ...state.basket,
        [id]: selected
      }
    }));
  }
}
