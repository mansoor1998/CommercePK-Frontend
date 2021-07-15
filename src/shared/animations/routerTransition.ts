import { trigger, state, animate, style, transition, query, animateChild, group } from '@angular/animations';

// tslint:disable-next-line:typedef
export function appModuleAnimation() {
  return slideFromBottom();
}

// tslint:disable-next-line:typedef
export function accountModuleAnimation() {
  return slideFromUp();
}

// tslint:disable-next-line:typedef
export function adminModuleAnimation() {
  return fadeInOut();
}

// tslint:disable-next-line:typedef
export function slideFromBottom() {
  return trigger('routerTransition', [
    state('void', style({ 'padding-top': '20px', opacity: '0' })),
    state('*', style({ 'padding-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.33s ease-out', style({ opacity: '1', 'padding-top': '0px' }))
    ])
  ]);
}

export function slideFromUp() {
  return trigger('routerTransition', [
    state('void', style({ 'margin-top': '10px', opacity: '0' })),
    state('*', style({ 'margin-top': '0px', opacity: '1' })),
    transition(':enter', [
      animate('0.3s ease-out', style({ opacity: '1', 'margin-top': '0px' }))
    ])
  ]);
}

export function openFromTopToBottom() {
  return trigger('customTransition', [
    state('void', style({ 'max-height': '0px' })),
    state('*', style({ 'max-height': '10000px' })),
    transition(':enter', [
      animate('3s ease-in', style({ 'max-height': '10000px' }))
    ])
  ]);
}

export function slideUp() {
  return trigger('slideTransition', [
    state('void', style({ 'padding-top': '-10px', opacity: '0' })),
    state('*', style({ 'padding-top': '30px', opacity: '1' })),
    transition(':enter', [
      animate('0.4s ease-in', style({ opacity: '1', 'padding-top': '30px' }))
    ])
  ]);
}

const animationTimeFrame = 300;

export function fadeInOut() {
  return trigger( 'fadeInOut', [
    // animation transtion from one state (any name) to another state (any name)
    transition('* => *', [
        style({ position: 'relative' }),
        // current position of enter and leave state
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ], { optional: true }),
        // enter position starting with initial state from where it would animate
        query(':enter', [style({ transform: 'scale(0.8)', opacity: 0 })], { optional: true }),
        
        // the leave state has started its animating process
        query(':leave', animateChild(), { optional: true }),

        // the leave state will animate to (  1.2 scale and fades away )
        query(':leave', [ animate(`${animationTimeFrame.toString()}ms ease`, style({ transform: 'scale(1.1)', opacity: 0 }) ) ], { optional: true }),

        // the enter state will animate to ( 1 scale and fade in ).
        query(':enter', [animate(`${animationTimeFrame.toString()}ms ease`, style({ transform: 'scale(1)', opacity: 1 }))], { optional: true }),

        // the enter state has started animating. (Both leave and enter process are syncrhonous)
        query(':enter', animateChild(), { optional: true })
      ])
  ]);
}

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('begin <=> end', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);