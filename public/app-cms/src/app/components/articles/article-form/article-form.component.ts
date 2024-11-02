import { Component, OnInit, ElementRef } from '@angular/core';
import { Jodit } from 'jodit/es2021/jodit';
import 'jodit/es2021/jodit.min.css';


@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.less'
})
export class ArticleFormComponent implements OnInit {
  private editor: any;

  constructor(private el: ElementRef) {}

  async ngOnInit() {
    const editorContainer = this.el.nativeElement.querySelector('.editor');
    this.editor = Jodit.make(editorContainer, {
      height: 400,
      toolbarAdaptive: false,
      language: 'pl',
      uploader: {
        url: 'http://localhost:3000/api/upload-file',
        method: 'POST',
        format: 'json',
        isSuccess: function (resp: any) {
          return resp.success;
        },
        getMessage: function (resp: any) {
          return resp.message;
        },
        process: function (resp: any) {
          const file = resp.files[0];
          return {
            files: [`http://localhost:3000${file.url}`],
            baseurl: 'http://localhost:3000'
          };
        },
        defaultHandlerSuccess: function(this:Jodit, response: any) {
          const image = response.files[0];
          this.selection.insertImage(image);
        },
        insertImageAsBase64URI: false
      }
    });
  }

  getContent() {
    console.log(this.editor.value);
  }

}
