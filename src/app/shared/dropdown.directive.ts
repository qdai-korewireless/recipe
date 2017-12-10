import { Directive, OnInit, ElementRef, Renderer2, HostListener,HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') onToggleOpen(event: Event){
        this.isOpen = !this.isOpen;
    }
    constructor(private elRef: ElementRef, private renderer: Renderer2){}

    ngOnInit(): void {

    }

}