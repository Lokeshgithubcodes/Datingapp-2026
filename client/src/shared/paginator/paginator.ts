import { Component, computed, input, model, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  pageNumber = model(1);
  pageSize = model(10);
  totalCount = input(0);
  totalPages = input(0);
  pageSizeOptions = input([5, 10, 20, 50]);

  pageChange = output<{pageNumber: number, pageSize: number}>();

  lastItemIndex = computed(() => {
    return Math.min(this.pageNumber() * this.pageSize(), this.totalCount())
  })

  onPageChange(newPage?: number, pageSize?: EventTarget | null) {
  if (newPage) {
    const maxPage = Math.ceil(this.totalCount() / this.pageSize());
    if (newPage > maxPage) return;   // ✅ prevent overflow
    this.pageNumber.set(newPage);
  }

  if (pageSize) {
    const size = Number((pageSize as HTMLSelectElement).value);
    this.pageSize.set(size);
    this.pageNumber.set(1); // ✅ reset page when size changes
  }

  this.pageChange.emit({
    pageNumber: this.pageNumber(),
    pageSize: this.pageSize()
  });
}
}
