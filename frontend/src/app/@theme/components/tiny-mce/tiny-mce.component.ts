import {
  Component,
  OnDestroy,
  AfterViewInit,
  Output,
  EventEmitter,
  ElementRef } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-tiny-mce',
  template: ''
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {
  @Output() editorKeyup: EventEmitter<any> = new EventEmitter<any>();

  editor: any;

  constructor(
    private host: ElementRef,
    private locationStrategy: LocationStrategy

  ) { }

  ngAfterViewInit(): void {
    tinymce.init({
      target: this.host.nativeElement,
      plugins: ['link', 'paste', 'table'],
      skin_url: `${this.locationStrategy.getBaseHref()}assets/skins/lightgray`,
      setup: (editor: any) => {
        this.editor = editor;
        editor.on('keyup', () => {
          this.editorKeyup.emit(editor.getContent());
        });
      },
      height: '320',
    });
  }
  ngOnDestroy(): void {
    tinymce.remove(this.editor);
  }

}
