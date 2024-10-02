import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UntypedFormControl } from '@angular/forms';
import { FulfillmentService } from '../services/fulfillment.service';
import { debounceTime, finalize, Subscription, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {

  /* store search medicine list */
  searchMedicineList = [];
  /* medicine search controller */
  medicineCtrl: UntypedFormControl;
  /* subscription handling */
  subs: Subscription;
  /* store table data - store and display checkoutMedicine list */
  dataSource = new MatTableDataSource([]);
  /* table column data */
  displayedColumns = ['index', 'medicineName',  'unit', 'mrp', 'qty', 'gst',  'amount'];

  constructor(private fulfillmentservice: FulfillmentService) {
    this.medicineCtrl = new UntypedFormControl("");
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const medicineSearchValueChanges = this.medicineCtrl?.valueChanges?.subscribe((res) => {
      if (res.length >= 3) {
        debounceTime(500);
        this.getSearchMedicineList();
      }
    });
    this.subs.add(medicineSearchValueChanges);
  }

  /* get search medicine list */
  getSearchMedicineList(): void {
    const obj = {
      apikey: localStorage.getItem("apiKey"),
      searchstring: this.medicineCtrl?.value
    }
    const getSearchMedineList = this.fulfillmentservice.getMedicineList(obj).subscribe((res)=> {
      this.searchMedicineList = res?.data?.result;
    });
    this.subs.add(getSearchMedineList);
  }

  /* get detail information of medicine for checkout order */
  getSelectedMedicineDetail(SelectedMedicine): void {
    const bodyObj = {
      apikey: localStorage.getItem("apiKey"),
      medicine_id: SelectedMedicine.medicine_id
    }
    const getMedicineDetails = this.fulfillmentservice.getMedicineDetails(bodyObj).pipe(
      tap((res)=> {
      if (res.data) {
        let newdata = this.dataSource?.data || [];
        newdata.push({...res?.data, ...SelectedMedicine});
        this.dataSource.data = [...newdata] 
      } else {
        alert("Medicine is not Available");
      }
      }),
      finalize(() => {
        this.medicineCtrl.setValue("");
        this.searchMedicineList = [];
      })
    ).subscribe();
    this.subs.add(getMedicineDetails);
  }

  /* delete table medicine data */
  deleteMedicine(index: number): void {
    if(confirm("Are you sure you want to remove this item")) {
      let data = this.dataSource?.data?.splice(index,1);
      this.dataSource.data = [...data];
    }
  }

  /* on destroy method */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
