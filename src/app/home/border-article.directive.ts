import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[appBorderArticle]' // modify "appBorderArticle" name with your own name
})

export class BorderArticleDirective {

  private initialColor: string = "#f5f5f5"; // White
  private defaultColor: string = "#343b48"; // Green
  private defaultHeight: number = 205;

  constructor(private elementRef: ElementRef) {  //TODO need to secure ElementRef with Renderer2
    // DOM reference where the Directive push
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  @Input("figBorderCard") borderColor: string; // With Alias ('figBorderCard')
  // @Input() figBorderCard: string; // Without Alias

  @HostListener("mouseenter") onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  setHeight(height: number) {
    this.elementRef.nativeElement.style.height = `${height}px`; // Modify style by Method
  }

  setBorder(color: string) {
    this.elementRef.nativeElement.style.border = `solid 4px ${color}`;
  }

}
