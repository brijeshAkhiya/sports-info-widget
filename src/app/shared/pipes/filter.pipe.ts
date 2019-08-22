import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, type: any): any[] {
        console.log(type);

        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        if (type == 'Soccer_category') {
            return items.filter(item => item.data.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
        }
        else {
            return items.filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
        }
    }
}