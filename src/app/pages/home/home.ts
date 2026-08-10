import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { Hero } from '../../components/hero/hero';
import { Projects } from '../../components/projects/projects';
import { Experience } from '../../components/experience/experience';
import { Skills } from '../../components/skills/skills';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  imports: [

    Hero,
    Projects,
    Experience,
    Skills,
    Contact,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
