import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Table} from '../table';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.less']
})
export class TableFormComponent implements OnInit {
  @Input() tableToEdit: Table;
  @Output() addTableEvent = new EventEmitter();
  @Output() cancelEditEvent = new EventEmitter();
  @Output() editTableEvent = new EventEmitter();

  table: Table = new Table('a', null);
  tableForm: FormGroup;

  constructor() {
    this.tableForm = new FormGroup({
      name: new FormControl('', Validators.required),
      participants: new FormControl('', Validators.compose([Validators.required, CustomValidators.number, CustomValidators.range([0, 12])]))
    });

  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.tableToEdit) {
      this.table.id = this.tableToEdit.id;
      this.tableForm.controls['name'].setValue(this.tableToEdit.name);
      this.tableForm.controls['participants'].setValue(this.tableToEdit.participants);
    }
  }

  saveTable() {
    this.table = new Table(this.tableForm.value.name, this.tableForm.value.participants);
    if (this.tableToEdit) {
      this.table.id = this.tableToEdit.id;
    }

    if (this.tableToEdit) {
      this.editTableEvent.emit(this.table);
      this.cancelEditEvent.emit(this.table);
    } else {
      this.addTableEvent.emit(this.table);
    }
    setTimeout(() => {
      this.clearForm();
    }, 0)

  }

  clearForm() {
    this.table = new Table('', null);
    this.tableForm.reset();
  }

  cancelEdit() {
    this.cancelEditEvent.emit(this.table);
    this.clearForm();
  }
}
