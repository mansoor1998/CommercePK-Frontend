import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [`
  span {
    display: inline-block;
  }

  .arrow {
      width: 32px; height: 32px; background-color: var(--arrow-background-color); border: none; border-radius: 50%;
  }

  .arrow:hover {
      background-color: bisque;
      background-color: var(--props-color-2);
  }

  .pages {
      background-color: var(--arrow-background-color);
      /* padding: 8px; */
      min-width: 32px;
      height: 32px;
      text-align: center;
      color: var(--text-color);
  }


  .pages > span {
      display: inline-flex;
      justify-content: center;
      align-items: center;
  }


  .selected {
      background-color: bisque !important;
      background-color: var(--props-color-2) !important;
      border-radius: 50%;
  }

  .disabled {
      opacity: 0.4;
  }

  .pagination-previous {
      margin-right: 10px;
  }

  .pagination-next {
      margin-left: 10px;
  }


  .border-left {
      border-radius: 50% 0 0 50%;
  }

  .border-right {
      border-radius: 0 50% 50% 0;
  }
  `]
})
export class PaginationComponent implements OnInit {
  ngOnInit(): void {
  }

  //@ts-ignore
  @Input() id: string;
  @Input() maxSize = 7;

  @Input()
  get directionLinks(): boolean {
    return this._directionLinks;
  }

  set directionLinks(value: boolean) {
    this._directionLinks = !!value && <any>value !== 'false';
  }

  @Input()
  get autoHide(): boolean {
    return this._autoHide;
  }

  set autoHide(value: boolean) {
    this._autoHide = !!value && <any>value !== 'false';
  }
  @Input() previousLabel = 'Previous';
  @Input() nextLabel = 'Next';
  @Input() screenReaderPaginationLabel = 'Pagination';
  @Input() screenReaderPageLabel = 'page';
  @Input() screenReaderCurrentLabel = `You're on page`;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  private _directionLinks = true;
  private _autoHide = false;
}
