import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

import { SeatService } from '../../shared/services/seatService/seat.service';
import { Seat } from '../../shared/models/seat';

@Component({
  selector: 'app-list-seat',
  templateUrl: './list-seat.component.html',
  styleUrls: ['./list-seat.component.css']
})
export class ListSeatComponent implements OnInit {
  coffeeID: string;
  seats: Seat[];
  constructor(
    public route: ActivatedRoute,
    public seatService: SeatService
  ) {
    this.coffeeID = this.route.snapshot.params.id;
    console.log('this.coffeeID', this.coffeeID);
  }

  ngOnInit(): void {
    let dateForlder = this.seatService.getForMatDateDDMMYYYY();
    let s = this.seatService.GetListSeat(this.coffeeID, dateForlder);
    s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
     
      this.seats = [];
      data.forEach(item => {
        let a = item.payload.toJSON();

        if(a['status'] == 0){
          a['$key'] = item.key;
          a['coffeeID'] = this.coffeeID;
          this.seats.push(a as Seat);
        }
       
      });
    });

  }

  onDone(seat){
    seat.status = 1;
    this.seatService.updateSeat(seat);
    console.log('seat', seat);
  }
}
