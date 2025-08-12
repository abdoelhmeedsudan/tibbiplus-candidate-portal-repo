import { Component } from '@angular/core';
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Home } from "../../pages/home/home";

@Component({
  selector: 'app-main-layout',
  imports: [Footer, Header, Home],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

}
