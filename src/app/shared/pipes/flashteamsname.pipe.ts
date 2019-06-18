import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'flashteam'
})

export class FlashteamPipe implements PipeTransform {

    transform(value: string, args: any): string {
        let teamsname = value.split("vs")
        if (args == 0) {
            return teamsname[0]
        }
        else {
            return teamsname[1]
        }
    }
}