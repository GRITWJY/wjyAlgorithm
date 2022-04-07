/*
 * 快速排序 O(nlogn)
 * */
function Partition(arr, l, r) {
  let pivot = arr[l];

  while (l < r) {
    while (l < r && arr[r] >= pivot) --r;
    arr[l] = arr[r];
    while (l < r && arr[l] <= pivot) ++l;
    arr[r] = arr[l];
  }

  arr[l] = pivot;
  return l;
}

function QuickSort(arr, l, r) {
  if (l < r) {
    let pivotpos = Partition(arr, l, r);
    QuickSort(arr, l, pivotpos - 1);
    QuickSort(arr, pivotpos + 1, r);
  }
}
