import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'transformPipe',
})
export class TransformPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }

}
