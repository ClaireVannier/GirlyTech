import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimatedAvatarComponent } from "./animated-avatar/animated-avatar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnimatedAvatarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GirlyTech';
}
