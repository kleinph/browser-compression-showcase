import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  file: File;

  size: number;
  compressing: boolean;
  downloadName: string;
  downloadUrl: SafeUrl;

  constructor(private readonly sanitizer: DomSanitizer) {}

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.size = undefined;
      this.downloadName = undefined;
      this.downloadUrl = undefined;
    }
  }

  compressCompressionStream() {
    this.compressing = true;

    const compressed = this.file
      .stream()
      .pipeThrough(new CompressionStream('deflate'));
    const request = new Request('uploadUrl', {
      method: 'POST',
      body: compressed,
      // for Chrome
      duplex: 'half',
    } as RequestInit);

    request
      .blob()
      .then((blob) => {
        this.compressing = false;
        this.size = blob.size;
        this.downloadName = this.file.name + '.gz';
        this.downloadUrl = this.createSafeObjectUrl(
          new File([blob], this.downloadName)
        );
      })
      .catch((error) => console.log('Error compressing:', error));
    // Rquest could be sent here
  }

  private createSafeObjectUrl(blob: Blob) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }
}
