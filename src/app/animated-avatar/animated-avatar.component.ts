import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import CustomEase from 'gsap-trial/CustomEase';
import CustomWiggle from 'gsap-trial/CustomWiggle';

gsap.registerPlugin(CustomEase, CustomWiggle);

@Component({
  selector: 'app-animated-avatar',
  standalone: true,
  templateUrl: './animated-avatar.component.html',
  styleUrls: ['./animated-avatar.component.scss']
})
export class AnimatedAvatarComponent implements AfterViewInit {
  private xPosition!: number;
  private yPosition!: number;
  private height!: number;
  private width!: number;
  private storedXPosition: number = 0;
  private storedYPosition: number = 0;
  private dizzyIsPlaying: boolean = false;
  private dom: { [key: string]: HTMLElement | NodeListOf<HTMLElement> } = {};

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.initDomReferences();
    this.animateAvatar();
  }

  private initDomReferences(): void {
    const nativeElement = this.elementRef.nativeElement;
    this.dom = {
      face: nativeElement.querySelector('.face') as HTMLElement,
      eye: nativeElement.querySelectorAll('.eye') as NodeListOf<HTMLElement>,
      innerFace: nativeElement.querySelector('.inner-face') as HTMLElement,
      hairFront: nativeElement.querySelector('.hair-front') as HTMLElement,
      hairBack: nativeElement.querySelector('.hair-back') as HTMLElement,
      shadow: nativeElement.querySelectorAll('.shadow') as NodeListOf<HTMLElement>,
      ear: nativeElement.querySelectorAll('.ear') as NodeListOf<HTMLElement>,
      eyebrowLeft: nativeElement.querySelector('.eyebrow-left') as HTMLElement,
      eyebrowRight: nativeElement.querySelector('.eyebrow-right') as HTMLElement
    };
  }

  private animateAvatar(): void {
    const meTl = gsap.timeline({
      onComplete: this.addMouseEvent.bind(this),
      delay: 1
    });

    gsap.set('.bg', { transformOrigin: '50% 50%' });
    gsap.set('.ear-right', { transformOrigin: '0% 50%' });
    gsap.set('.ear-left', { transformOrigin: '100% 50%' });
    gsap.set('.me', { opacity: 1 });

    meTl
      .from(
        '.me',
        {
          duration: 1,
          yPercent: 100,
          ease: 'elastic.out(0.5, 0.4)'
        },
        0.5
      )
      .from(
        '.head , .hair , .shadow',
        {
          duration: 0.9,
          yPercent: 20,
          ease: 'elastic.out(0.58, 0.25)'
        },
        0.6
      )
      .from(
        '.ear-right',
        {
          duration: 1,
          rotate: 40,
          yPercent: 10,
          ease: 'elastic.out(0.5, 0.2)'
        },
        0.7
      )
      .from(
        '.ear-left',
        {
          duration: 1,
          rotate: -40,
          yPercent: 10,
          ease: 'elastic.out(0.5, 0.2)'
        },
        0.7
      )
      .to(
        '.glasses',
        {
          duration: 1,
          keyframes: [{ yPercent: -10 }, { yPercent: -0 }],
          ease: 'elastic.out(0.5, 0.2)'
        },
        0.75
      )
      .from(
        '.eyebrow-right , .eyebrow-left',
        {
          duration: 1,
          yPercent: 300,
          ease: 'elastic.out(0.5, 0.2)'
        },
        0.7
      )
      .to(
        '.eye-right , .eye-left',
        {
          duration: 0.01,
          opacity: 1
        },
        0.85
      )
      .to(
        '.eye-right-2 , .eye-left-2',
        {
          duration: 0.01,
          opacity: 0
        },
        0.85
      );

    const blink = gsap.timeline({
      repeat: -1,
      repeatDelay: 5,
      paused: true
    });

    blink
      .to(
        '.eye-right, .eye-left',
        {
          duration: 0.01,
          opacity: 0
        },
        0
      )
      .to(
        '.eye-right-2, .eye-left-2',
        {
          duration: 0.01,
          opacity: 1
        },
        0
      )
      .to(
        '.eye-right, .eye-left',
        {
          duration: 0.01,
          opacity: 1
        },
        0.15
      )
      .to(
        '.eye-right-2 , .eye-left-2',
        {
          duration: 0.01,
          opacity: 0
        },
        0.15
      );

    CustomWiggle.create('myWiggle', {
      wiggles: 6,
      type: 'ease-out'
    });
    CustomWiggle.create('lessWiggle', {
      wiggles: 4,
      type: 'ease-in-out'
    });

    const dizzy = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.dizzyIsPlaying = false;
      }
    });

    dizzy
      .to(
        '.eyes',
        {
          duration: 0.01,
          opacity: 0
        },
        0
      )
      .to(
        '.dizzy',
        {
          duration: 0.01,
          opacity: 0.3
        },
        0
      )
      .to(
        '.mouth',
        {
          duration: 0.01,
          opacity: 0
        },
        0
      )
      .to(
        '.oh',
        {
          duration: 0.01,
          opacity: 0.85
        },
        0
      )
      .to(
        '.head, .hair-back, .shadow',
        {
          duration: 6,
          rotate: 2,
          transformOrigin: '50% 50%',
          ease: 'myWiggle'
        },
        0
      )
      .to(
        '.me',
        {
          duration: 6,
          rotate: -2,
          transformOrigin: '50% 100%',
          ease: 'myWiggle'
        },
        0
      )
      .to(
        '.me',
        {
          duration: 4,
          scale: 0.99,
          transformOrigin: '50% 100%',
          ease: 'lessWiggle'
        },
        0
      )
      .to(
        '.dizzy-1',
        {
          rotate: -360,
          duration: 1,
          repeat: 5,
          transformOrigin: '50% 50%',
          ease: 'none'
        },
        0.01
      )
      .to(
        '.dizzy-2',
        {
          rotate: 360,
          duration: 1,
          repeat: 5,
          transformOrigin: '50% 50%',
          ease: 'none'
        },
        0.01
      )
      .to(
        '.eyes',
        {
          duration: 0.01,
          opacity: 1
        },
        4
      )
      .to(
        '.dizzy',
        {
          duration: 0.01,
          opacity: 0
        },
        4
      )
      .to(
        '.oh',
        {
          duration: 0.01,
          opacity: 0
        },
        4
      )
      .to(
        '.mouth',
        {
          duration: 0.01,
          opacity: 1
        },
        4
      );

    this.updateWindowSize();
    window.addEventListener('resize', this.updateWindowSize.bind(this));
  }

  private addMouseEvent(): void {
    const safeToAnimate = window.matchMedia(
      '(prefers-reduced-motion: no-preference)'
    ).matches;

    if (safeToAnimate) {
      window.addEventListener('mousemove', this.updateScreenCoords.bind(this));
      gsap.ticker.add(this.animateFace.bind(this));
    }
  }

  private updateScreenCoords(event: MouseEvent): void {
    if (!this.dizzyIsPlaying) {
      this.xPosition = event.clientX;
      this.yPosition = event.clientY;
    }
    if (!this.dizzyIsPlaying && Math.abs(event.movementX) > 500) {
      this.dizzyIsPlaying = true;
      gsap.timeline().restart();
    }
  }

  private animateFace(): void {
    if (!this.xPosition) return;
    if (this.storedXPosition === this.xPosition && this.storedYPosition === this.yPosition) return;

    const x = this.percentage(this.xPosition, this.width) - 50;
    const y = this.percentage(this.yPosition, this.height) - 50;
    const yHigh = this.percentage(this.yPosition, this.height) - 20;
    const yLow = this.percentage(this.yPosition, this.height) - 80;

    gsap.to(this.dom['face'], {
      yPercent: yLow / 30,
      xPercent: x / 30
    });
    gsap.to(this.dom['eye'], {
      yPercent: yHigh / 3,
      xPercent: x / 2
    });
    gsap.to(this.dom['innerFace'], {
      yPercent: y / 6,
      xPercent: x / 8
    });
    gsap.to(this.dom['hairFront'], {
      yPercent: yHigh / 15,
      xPercent: x / 22
    });
    gsap.to([this.dom['hairBack'], this.dom['shadow']], {
      yPercent: (yLow / 20) * -1,
      xPercent: (x / 20) * -1
    });
    gsap.to(this.dom['ear'], {
      yPercent: (y / 1.5) * -1,
      xPercent: (x / 10) * -1
    });
    gsap.to([this.dom['eyebrowLeft'], this.dom['eyebrowRight']], {
      yPercent: y * 2.5
    });

    this.storedXPosition = this.xPosition;
    this.storedYPosition = this.yPosition;
  }

  private updateWindowSize(): void {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  private percentage(partialValue: number, totalValue: number): number {
    return (100 * partialValue) / totalValue;
  }
}
